import { getUserWithArticles } from "@/features/user/_lib/fetcher";
import { updateItemsByLevel } from "@/features/items/data/itemsData";
import * as Items from "@/features/items/components";
import styles from "./ItemCardList.module.css";

/**
 * ItemCardList (Server Component)
 *
 * アイテム一覧を取得して表示するServer Component
 */
const ItemCardList = async () => {
	try {
		const { articleCount, isGuestUser } = await getUserWithArticles();
		const items = updateItemsByLevel(articleCount);
		return <Items.ItemCardListClient items={items} isGuestUser={isGuestUser} />;
	} catch (error) {
		console.error("アイテムデータ取得エラー:", error);
		return <p className={styles["error-message"]}>アイテムデータの取得に失敗しました。</p>;
	}
};

export default ItemCardList;
