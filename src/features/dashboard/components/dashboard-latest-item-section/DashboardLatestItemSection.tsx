import styles from "./DashboardLatestItemSection.module.css";
import Image from "next/image";
import {
	heroLevelAndItemRelation,
	customItemNames,
	customItemDescriptions,
} from "@/features/items/data/itemsData";
import { getDashboardHeroData } from "@/features/dashboard/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import XShareButton from "@/components/common/x-share-button/XShareButton";
import * as Dashboard from "@/features/dashboard/components";

const DashboardLatestItemSection = async () => {
	// Request Memoizationにより、他コンポーネントと同じフェッチを共有
	const [heroData, user] = await Promise.all([getDashboardHeroData(), getUser()]);

	// ゲストユーザーかどうかの判定
	const isGuestUser = !user || !user.zennUsername;

	// 最新のアイテムを計算
	const articleCount = heroData.level;
	const acquiredIds = Object.entries(heroLevelAndItemRelation)
		.filter(([, reqLevel]) => articleCount >= reqLevel)
		.map(([id]) => parseInt(id, 10));

	let itemId: number | null = null;
	if (acquiredIds.length > 0) {
		itemId = Math.max(...acquiredIds);
	}

	const itemName = itemId !== null ? customItemNames[itemId] || "不明なアイテム" : "";
	const itemDescription = itemId !== null ? customItemDescriptions[itemId] || "詳細不明" : "";

	return (
		<section className={`${styles["latest-item-section"]}`}>
			<h2 className={`${styles["latest-item-title"]}`}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					className={`${styles["latest-item-title-icon"]}`}
				/>
				<span>最近入手したアイテム</span>
			</h2>
			<div className={`${styles["latest-item-container"]}`}>
				{isGuestUser ? (
					<div className={styles["latest-item-guest-user-container"]}>
						<p className={styles["latest-item-guest-user-message"]}>
							ログインするとアイテムの情報が表示されます。
						</p>
					</div>
				) : itemId === null ? (
					<div className={styles["latest-item-null-container"]}>
						<p className={styles["latest-item-null-message"]}>まだ入手したアイテムはありません。</p>
					</div>
				) : (
					<Dashboard.DashboardLatestItemCard
						itemId={itemId}
						itemName={itemName}
						itemDescription={itemDescription}
					/>
				)}
			</div>
			{/* Xへのシェアリンク */}
			<XShareButton
				level={heroData.level}
				username=""
				customText="最近入手したアイテムをXでシェアする"
				customShareText={`【アイテムを入手した！】\n\n⭐️ 勇者は「${itemName}」を手に入れた！\n\n`}
				className={`${styles["latest-item-share-link"]}`}
				iconWrapClassName={`${styles["latest-item-share-icon-wrap"]}`}
				iconClassName={`${styles["latest-item-share-icon"]}`}
				textClassName={`${styles["latest-item-share-link-text"]}`}
				iconWidth={11}
				iconHeight={11}
				isGuestUser={isGuestUser}
				hasContent={itemId !== null}
				noContentMessage="シェアできるアイテムがありません。"
			/>
		</section>
	);
};

export default DashboardLatestItemSection;
