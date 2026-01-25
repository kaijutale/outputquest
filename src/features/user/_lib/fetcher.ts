import "server-only"; // Part 1推奨: サーバー専用コードの保護
import { cache } from "react";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CacheTags } from "@/lib/cache-tags";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { PostData } from "@/features/posts/types";

/**
 * ユーザー情報の型定義
 */
export type User = {
	id: string;
	clerkId: string;
	email: string | null;
	zennUsername: string | null;
	createdAt: Date;
	updatedAt: Date;
} | null;

/**
 * ユーザー情報を取得する内部関数（use cacheディレクティブ使用）
 *
 * Next.js 15+の"use cache"を使用した純粋なDB取得ロジック。
 * 認証（動的API）と分離することで、安全にキャッシュを適用。
 *
 * Part 3「キャッシング戦略」に基づく実装。
 *
 * @param clerkId - Clerk認証のユーザーID
 * @returns ユーザー情報
 */
async function getCachedUserData(clerkId: string): Promise<User> {
	"use cache";
	cacheTag(CacheTags.user(clerkId));

	try {
		const user = await prisma.user.findUnique({
			where: { clerkId },
			select: {
				id: true,
				clerkId: true,
				email: true,
				zennUsername: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return user;
	} catch (error) {
		console.error("Failed to fetch user:", error);
		return null;
	}
}

/**
 * ユーザー情報を取得する関数（Request Memoization + use cache対応）
 *
 * 2層のキャッシュ戦略:
 * 1. React.cache() - Request Memoization（同一リクエスト内で重複排除）
 * 2. "use cache" - Data Cache（リクエスト間でキャッシュ）
 *
 * 安全なパターン：
 * - 認証チェック（auth()）はキャッシュしない
 * - データ取得のみを"use cache"でキャッシュ
 *
 * Part 3「キャッシング戦略」に基づく実装。
 *
 * @returns ユーザー情報（認証されていない場合はnull）
 */
export const getUser = cache(async (): Promise<User> => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	try {
		// 認証チェック（キャッシュしない、動的API）
		const { userId } = await auth();

		if (!userId) {
			return null;
		}

		// データ取得のみキャッシュ（純粋なDB操作）
		return await getCachedUserData(userId);
	} catch (error) {
		console.error("Failed to fetch user:", error);
		return null;
	}
});

/**
 * ユーザー情報をプリロードする関数
 *
 * フェッチを早期に開始し、ウォーターフォールを防ぐために使用。
 * awaitせずに呼び出すことで、バックグラウンドでフェッチを開始する。
 */
export const preloadUser = () => {
	void getUser(); // Promiseを開始するだけ（awaitしない）
};

/**
 * ユーザー情報とZenn記事を一緒に取得する共通ユーティリティ
 *
 * 複数のコンポーネントで共通して使用されるデータフェッチパターンを抽象化。
 * - StrengthHeroInfo, StrengthTitleInfo
 * - ItemCardList, ItemDetailCard
 * - PartyMemberCardList, PartyMemberDetailCard
 * - PostsListWithData
 *
 * @returns ユーザー情報、Zennユーザー名、ゲストフラグ、記事一覧、記事数
 */
export type UserWithArticles = {
	user: User;
	zennUsername: string;
	isGuestUser: boolean;
	articles: PostData[];
	articleCount: number;
};

export const getUserWithArticles = cache(async (): Promise<UserWithArticles> => {
	const user = await getUser();

	// ゲストユーザーの判定（Zenn未連携の場合はデモユーザー）
	const zennUsername = user?.zennUsername || "aoyamadev";
	const isGuestUser = !user?.zennUsername;

	// Zenn記事を取得（全件取得）
	const articles = await getZennArticles(zennUsername, { fetchAll: true });

	return {
		user,
		zennUsername,
		isGuestUser,
		articles,
		articleCount: articles.length,
	};
});
