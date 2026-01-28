import { Metadata } from "next";
import { baseMetadata } from "@/config/metadata";
import {
	heroLevelAndItemRelation,
	customItemNames,
	customItemDescriptions,
	isAcquiredByHeroLevel,
} from "@/features/items/data/itemsData";
import { getUserWithArticles } from "@/features/user/_lib/fetcher";

/**
 * アイテム詳細ページのメタデータを生成する関数
 * 認証状態と勇者レベルに基づいて適切なメタデータを返す
 *
 * @param itemId アイテムID
 * @returns メタデータオブジェクト
 */
export async function generateItemMetadata(itemId: number): Promise<Metadata> {
	// 無効なIDの場合の処理
	if (isNaN(itemId) || itemId < 1 || itemId > 30) {
		return {
			...baseMetadata,
			title: "アイテムが見つかりません",
			description: "指定されたアイテムは存在しません。",
		};
	}

	const requiredLevel = heroLevelAndItemRelation[itemId] || itemId;

	// ユーザー情報を取得
	const { isGuestUser, articleCount } = await getUserWithArticles();
	const heroLevel = Math.max(articleCount, 1);

	// ゲストユーザー（未ログイン or Zenn未連携）の場合
	if (isGuestUser) {
		const guestTitle = "未入手のアイテム";
		const guestDescription =
			"ログインすると入手したアイテムについての詳細情報がここに表示されます。";
		const guestImageUrl = "/images/items-page/unacquired-icon/treasure-chest-close-icon01.png";

		return {
			...baseMetadata,
			title: guestTitle,
			description: guestDescription,
			openGraph: {
				...baseMetadata.openGraph,
				title: `${guestTitle}｜アイテム詳細`,
				description: guestDescription,
				images: [
					{
						url: guestImageUrl,
						width: 200,
						height: 200,
						alt: guestTitle,
					},
				],
			},
			alternates: {
				canonical: `/items/${itemId}`,
			},
			metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://outputquest.com"),
		};
	}

	// ログイン済みユーザーの場合、レベルに基づいて入手状態を判定
	const isAcquired = isAcquiredByHeroLevel(itemId, heroLevel);

	if (isAcquired) {
		// 入手済みの場合
		const itemName = customItemNames[itemId];
		const itemDescription = customItemDescriptions[itemId];

		return {
			...baseMetadata,
			title: itemName,
			description: itemDescription,
			openGraph: {
				...baseMetadata.openGraph,
				title: `${itemName}｜アイテム詳細`,
				description: itemDescription,
				images: [
					{
						url: `/images/items-page/acquired-icon/item-${itemId}.svg`,
						width: 200,
						height: 200,
						alt: itemName,
					},
				],
			},
			alternates: {
				canonical: `/items/${itemId}`,
			},
			metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://outputquest.com"),
		};
	} else {
		// 未入手の場合
		const unacquiredTitle = "未入手のアイテム";
		const unacquiredDescription = `このアイテムはレベル${requiredLevel}で入手できます。冒険を続けて探索しましょう。`;
		const unacquiredImageUrl = "/images/items-page/unacquired-icon/treasure-chest-close-icon01.png";

		return {
			...baseMetadata,
			title: unacquiredTitle,
			description: unacquiredDescription,
			openGraph: {
				...baseMetadata.openGraph,
				title: `${unacquiredTitle}｜アイテム詳細`,
				description: unacquiredDescription,
				images: [
					{
						url: unacquiredImageUrl,
						width: 200,
						height: 200,
						alt: unacquiredTitle,
					},
				],
			},
			alternates: {
				canonical: `/items/${itemId}`,
			},
			metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://outputquest.com"),
		};
	}
}
