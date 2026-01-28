import { Metadata } from "next";
import { baseMetadata } from "@/config/metadata";
import {
	heroLevelAndMemberRelation,
	customMemberNames,
	customMemberDescriptions,
	isAcquiredByHeroLevel,
} from "@/features/party/data/partyMemberData";
import { getUserWithArticles } from "@/features/user/_lib/fetcher";

/**
 * 仲間詳細ページのメタデータを生成する関数
 * 認証状態と勇者レベルに基づいて適切なメタデータを返す
 *
 * @param partyId 仲間ID
 * @returns メタデータオブジェクト
 */
export async function generatePartyMemberMetadata(partyId: number): Promise<Metadata> {
	// 無効なIDの場合の処理
	if (isNaN(partyId) || partyId < 1 || partyId > 30) {
		return {
			...baseMetadata,
			title: "仲間が見つかりません",
			description: "指定された仲間は存在しません。",
		};
	}

	const requiredLevel = heroLevelAndMemberRelation[partyId] || partyId;

	// ユーザー情報を取得
	const { isGuestUser, articleCount } = await getUserWithArticles();
	const heroLevel = Math.max(articleCount, 1);

	// ゲストユーザー（未ログイン or Zenn未連携）の場合
	if (isGuestUser) {
		const guestTitle = "まだ見ぬ仲間";
		const guestDescription =
			"ログインすると勇者の仲間に加わったキャラクターの詳細情報がここに表示されます。";
		const guestImageUrl = "/images/party-page/unacquired-icon/mark_question.svg";

		return {
			...baseMetadata,
			title: guestTitle,
			description: guestDescription,
			openGraph: {
				...baseMetadata.openGraph,
				title: `${guestTitle}｜なかま詳細`,
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
				canonical: `/party/${partyId}`,
			},
			metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://outputquest.com"),
		};
	}

	// ログイン済みユーザーの場合、レベルに基づいて獲得状態を判定
	const isAcquired = isAcquiredByHeroLevel(partyId, heroLevel);

	if (isAcquired) {
		// 獲得済みの場合
		const memberName = customMemberNames[partyId];
		const memberDescription = customMemberDescriptions[partyId];

		return {
			...baseMetadata,
			title: memberName,
			description: memberDescription,
			openGraph: {
				...baseMetadata.openGraph,
				title: `${memberName}｜なかま詳細`,
				description: memberDescription,
				images: [
					{
						url: `/images/party-page/acquired-icon/party-member-${partyId}.svg`,
						width: 200,
						height: 200,
						alt: memberName,
					},
				],
			},
			alternates: {
				canonical: `/party/${partyId}`,
			},
			metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://outputquest.com"),
		};
	} else {
		// 未獲得の場合
		const unacquiredTitle = "まだ見ぬ仲間";
		const unacquiredDescription = `このキャラはLv${requiredLevel}で仲間に加わるぞ！冒険を続けて勇者のレベルを上げましょう！`;
		const unacquiredImageUrl = "/images/party-page/unacquired-icon/mark_question.svg";

		return {
			...baseMetadata,
			title: unacquiredTitle,
			description: unacquiredDescription,
			openGraph: {
				...baseMetadata.openGraph,
				title: `${unacquiredTitle}｜なかま詳細`,
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
				canonical: `/party/${partyId}`,
			},
			metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://outputquest.com"),
		};
	}
}
