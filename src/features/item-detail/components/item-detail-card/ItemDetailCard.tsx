import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import {
	isAcquiredByHeroLevel,
	heroLevelAndItemRelation,
	customItemNames,
	customItemDescriptions,
	customItemImages,
	customItemSilhouetteImages,
} from "@/features/items/data/itemsData";
import * as ItemDetail from "@/features/item-detail/components";
import styles from "./ItemDetailCard.module.css";

interface ItemDetailCardProps {
	itemId: number;
}

const ItemDetailCard = async ({ itemId }: ItemDetailCardProps) => {
	try {
		// ユーザー情報を取得（Request Memoization + use cache）
		const user = await getUser();

		// ゲストユーザーの判定
		const zennUsername = user?.zennUsername || "aoyamadev";
		const isGuestUser = !user?.zennUsername;
		let currentLevel = 1;

		if (user?.zennUsername) {
			// Zenn記事を取得してレベルを計算
			const articles = await getZennArticles(zennUsername, { fetchAll: true });
			currentLevel = articles.length;
		}

		// アイテムの入手状態を判定
		const isAcquired = !isGuestUser && isAcquiredByHeroLevel(itemId, currentLevel);

		// アイテムを入手するために必要なレベル
		const requiredLevel = heroLevelAndItemRelation[itemId] || itemId;

		// レベル差を計算（マイナスにならないようにする）
		const levelDifference = Math.max(0, requiredLevel - currentLevel);

		// アイテムの名前と説明文を取得
		const itemName = isAcquired ? customItemNames[itemId] || `アイテム${itemId}` : null;
		const itemDescription = isAcquired
			? customItemDescriptions[itemId] || `このアイテムの説明はありません。`
			: null;

		// 画像パスを取得
		const acquiredImagePath = customItemImages[itemId]
			? `/images/items-page/acquired-icon/${customItemImages[itemId]}`
			: `/images/items-page/acquired-icon/item-${itemId}.png`;
		const unacquiredImagePath = `/images/items-page/unacquired-icon/${customItemSilhouetteImages[itemId]}`;

		// Client Componentにデータを渡す
		return (
			<ItemDetail.ItemDetailCardClient
				itemId={itemId}
				isAcquired={isAcquired}
				isGuestUser={isGuestUser}
				itemName={itemName}
				itemDescription={itemDescription}
				requiredLevel={requiredLevel}
				levelDifference={levelDifference}
				acquiredImagePath={acquiredImagePath}
				unacquiredImagePath={unacquiredImagePath}
			/>
		);
	} catch (error) {
		console.error("アイテム詳細データ取得エラー:", error);
		return <p className={styles["error-message"]}>アイテム詳細データの取得に失敗しました。</p>;
	}
};

export default ItemDetailCard;
