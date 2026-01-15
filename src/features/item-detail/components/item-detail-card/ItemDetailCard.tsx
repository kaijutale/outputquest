import { connection } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import {
	isAcquiredByHeroLevel,
	heroLevelAndItemRelation,
	customItemNames,
	customItemDescriptions,
	customItemImages,
	customItemSilhouetteImages,
} from "@/features/items/data/itemsData";
import ItemDetailCardClient from "../item-detail-card-client/ItemDetailCardClient";
import styles from "./ItemDetailCard.module.css";

interface ItemDetailCardProps {
	itemId: number;
}

/**
 * ItemDetailCard (Server Component)
 *
 * アイテム詳細データを取得して表示するServer Component
 *
 * データフェッチ:
 * - connection() + auth() + prisma: ユーザー認証とDB取得（動的）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 */
const ItemDetailCard = async ({ itemId }: ItemDetailCardProps) => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	try {
		// 認証情報を取得
		const { userId } = await auth();

		// ゲストユーザーの判定
		let zennUsername = "aoyamadev"; // デフォルト値
		let isGuestUser = true;
		let currentLevel = 1;

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

				// Zenn記事を取得してレベルを計算
				const articles = await getZennArticles(zennUsername, { fetchAll: true });
				currentLevel = articles.length;
			}
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
			<ItemDetailCardClient
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
