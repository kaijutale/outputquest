import { connection } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { PlatformType } from "@/features/posts/types";
import * as Posts from "@/features/posts/components";
import styles from "./PostsListWithData.module.css";

/**
 * PostsListWithData (Server Component)
 *
 * Zenn記事一覧を取得して表示するServer Component
 *
 * データフェッチ:
 * - connection() + auth() + prisma: ユーザー認証とDB取得（動的）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 *
 * 注意: getUser()を使うとキャッシュの問題でユーザー間でデータが混在する
 * 可能性があるため、認証関連は直接呼び出しを維持
 */
const PostsListWithData = async () => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	try {
		// 認証情報を取得
		const { userId } = await auth();

		// ゲストユーザーの判定
		let zennUsername = "aoyamadev"; // デフォルト値

		if (userId) {
			// 認証済みユーザーの場合、DBからzennUsernameを取得
			const user = await prisma.user.findUnique({
				where: { clerkId: userId },
				select: {
					zennUsername: true,
				},
			});

			if (user?.zennUsername) {
				zennUsername = user.zennUsername;
			}
		}

		// Zenn記事を取得（全件取得）- use cache + Request Memoization
		const articles = await getZennArticles(zennUsername, { fetchAll: true });

		// platformType: "zenn" を各記事に設定
		const postsData = articles.map((article) => ({
			...article,
			platformType: "zenn" as PlatformType,
		}));

		return <Posts.PostsList postsData={postsData} />;
	} catch (error) {
		console.error("Zenn記事の取得エラー:", error);
		return (
			<div className={styles["error-message"]}>
				Zennの記事データの取得中にエラーが発生しました。
			</div>
		);
	}
};

export default PostsListWithData;
