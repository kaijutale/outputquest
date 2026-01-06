import styles from "./DashboardLatestPartyMemberSection.module.css";
import Image from "next/image";
import {
	heroLevelAndMemberRelation,
	customMemberNames,
	customMemberDescriptions,
} from "@/features/party/data/partyMemberData";
import { getDashboardHeroData } from "@/features/dashboard/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import XShareButton from "@/components/common/x-share-button/XShareButton";
import { DashboardLatestPartyMemberCard } from "./DashboardLatestPartyMemberCard";

const DashboardLatestPartyMemberSection = async () => {
	// Request Memoizationにより、他コンポーネントと同じフェッチを共有
	const [heroData, user] = await Promise.all([getDashboardHeroData(), getUser()]);

	// ゲストユーザーかどうかの判定
	const isGuestUser = !user || !user.zennUsername;

	// 最新の仲間を計算
	const articleCount = heroData.level;
	const acquiredIds = Object.entries(heroLevelAndMemberRelation)
		.filter(([, reqLevel]) => articleCount >= reqLevel)
		.map(([id]) => parseInt(id, 10));

	let memberId: number | null = null;
	if (acquiredIds.length > 0) {
		memberId = Math.max(...acquiredIds);
	}

	const memberName = memberId !== null ? customMemberNames[memberId] || "まだ見ぬ仲間" : "";
	const memberDescription =
		memberId !== null ? customMemberDescriptions[memberId] || "詳細不明" : "";

	return (
		<section className={`${styles["party-member-section"]}`}>
			<h2 className={`${styles["party-member-title"]}`}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					className={`${styles["party-member-title-icon"]}`}
				/>
				<span>最近仲間に加わったキャラクター</span>
			</h2>
			<div className={`${styles["party-member-container"]}`}>
				{isGuestUser ? (
					<div className={styles["party-member-guest-user-container"]}>
						<p className={styles["party-member-guest-user-message"]}>
							ログインすると仲間の情報が表示されます。
						</p>
					</div>
				) : memberId === null ? (
					<div className={styles["party-member-null-container"]}>
						<p className={styles["party-member-null-message"]}>
							まだ仲間になったキャラクターはいません。
						</p>
					</div>
				) : (
					<DashboardLatestPartyMemberCard
						memberId={memberId}
						memberName={memberName}
						memberDescription={memberDescription}
					/>
				)}
			</div>
			{/* Xへのシェアリンク */}
			<XShareButton
				level={heroData.level}
				username=""
				customText="最近仲間に加わったキャラをXでシェアする"
				customShareText={`【仲間が加わった！】\n\n⭐️ 勇者の仲間に「${memberName}」が加わった！\n\n`}
				className={`${styles["party-member-share-link"]}`}
				iconWrapClassName={`${styles["party-member-share-icon-wrap"]}`}
				iconClassName={`${styles["party-member-share-icon"]}`}
				textClassName={`${styles["party-member-share-link-text"]}`}
				iconWidth={11}
				iconHeight={11}
				isGuestUser={isGuestUser}
				hasContent={memberId !== null}
				noContentMessage="シェアできる仲間がいません。"
			/>
		</section>
	);
};

export default DashboardLatestPartyMemberSection;
