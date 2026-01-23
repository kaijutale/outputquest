import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import { updateItemsByLevel } from "@/features/items/data/itemsData";
import * as Items from "@/features/items/components";
import styles from "./ItemCardList.module.css";

/**
 * ItemCardList (Server Component)
 *
 * アイテム一覧を取得して表示するServer Component
 *
 * データフェッチ:
 * - getUser(): ユーザー認証とDB取得（Request Memoization + use cache）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 */
const ItemCardList = async () => {
	try {
		// ユーザー情報を取得（Request Memoization + use cache）
		const user = await getUser();

		// ゲストユーザーの判定
		const zennUsername = user?.zennUsername || "aoyamadev";
		const isGuestUser = !user?.zennUsername;

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
