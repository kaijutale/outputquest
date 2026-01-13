import { connection } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { updateItemsByLevel } from "@/features/items/data/itemsData";
import * as Items from "@/features/items/components";
import styles from "./ItemCardList.module.css";

/**
 * ItemCardList (Server Component)
 *
 * アイテム一覧を取得して表示するServer Component
 *
 * データフェッチ:
 * - connection() + auth() + prisma: ユーザー認証とDB取得（動的）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 *
 * 注意: getUser()を使うとキャッシュの問題でユーザー間でデータが混在する
 * 可能性があるため、認証関連は直接呼び出しを維持
 */
const ItemCardList = async () => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	try {
		// 認証情報を取得
		const { userId } = await auth();

		// ゲストユーザーの判定
		let zennUsername = "aoyamadev"; // デフォルト値
		let isGuestUser = true;

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
				isGuestUser = false;
			}
		}

		// Zenn記事を取得（use cache + Request Memoization）
		const articles = await getZennArticles(zennUsername, { fetchAll: true });
		const articleCount = articles.length;

		// アイテムデータを更新
		const items = updateItemsByLevel(articleCount);

		// Client Componentにデータを渡す
		return <Items.ItemCardListClient items={items} isGuestUser={isGuestUser} />;
	} catch (error) {
		console.error("アイテムデータ取得エラー:", error);
		return <p className={styles["error-message"]}>アイテムデータの取得に失敗しました。</p>;
	}
};

export default ItemCardList;
