import { getUserWithArticles } from "@/features/user/_lib/fetcher";
import {
	isAcquiredByHeroLevel,
	heroLevelAndMemberRelation,
	customMemberNames,
	customMemberDescriptions,
	customMemberImages,
	customMemberSilhouetteImages,
} from "@/features/party/data/partyMemberData";
import PartyMemberDetailCardClient from "../party-member-detail-card-client/PartyMemberDetailCardClient";
import styles from "./PartyMemberDetailCard.module.css";

interface PartyMemberDetailCardProps {
	partyId: number;
}

/**
 * PartyMemberDetailCard (Server Component)
 *
 * なかま詳細データを取得して表示するServer Component
 */
const PartyMemberDetailCard = async ({ partyId }: PartyMemberDetailCardProps) => {
	try {
		const { articleCount, isGuestUser } = await getUserWithArticles();
		const currentLevel = isGuestUser ? 1 : articleCount;

		// 仲間の入手状態を判定
		const isAcquired = !isGuestUser && isAcquiredByHeroLevel(partyId, currentLevel);

		// 仲間を入手するために必要なレベル
		const requiredLevel = heroLevelAndMemberRelation[partyId] || partyId;

		// レベル差を計算（マイナスにならないようにする）
		const levelDifference = Math.max(0, requiredLevel - currentLevel);

		// 仲間の名前と説明文を取得
		const memberName = isAcquired ? customMemberNames[partyId] || `勇者の仲間${partyId}` : null;
		const memberDescription = isAcquired
			? customMemberDescriptions[partyId] || `このキャラクターの説明はありません。`
			: null;

		// 画像パスを取得
		const acquiredImagePath = `/images/party-page/acquired-icon/${customMemberImages[partyId]}`;
		const unacquiredImagePath = `/images/party-page/unacquired-icon/${customMemberSilhouetteImages[partyId]}`;

		// Client Componentにデータを渡す
		return (
			<PartyMemberDetailCardClient
				partyId={partyId}
				isAcquired={isAcquired}
				isGuestUser={isGuestUser}
				memberName={memberName}
				memberDescription={memberDescription}
				requiredLevel={requiredLevel}
				levelDifference={levelDifference}
				acquiredImagePath={acquiredImagePath}
				unacquiredImagePath={unacquiredImagePath}
			/>
		);
	} catch (error) {
		console.error("なかま詳細データ取得エラー:", error);
		return <p className={styles["error-message"]}>なかま詳細データの取得に失敗しました。</p>;
	}
};

export default PartyMemberDetailCard;
