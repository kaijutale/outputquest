import styles from "./DashboardPlatformStatsSection.module.css";
import XShareButton from "@/components/common/x-share-button/XShareButton";
import Image from "next/image";
import { getDashboardHeroData } from "@/features/dashboard/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";

const DashboardPlatformStatsSection = async () => {
	// Request Memoizationにより、他コンポーネントと同じフェッチを共有
	const [heroData, user] = await Promise.all([getDashboardHeroData(), getUser()]);

	// ゲストユーザーかどうかの判定
	const isGuestUser = !user || !user.zennUsername;

	// 実際のZennデータと定義データを組み合わせてstatsを作成
	const zennStat = {
		platform: "Zenn",
		count: heroData.level,
		color: "#3ea8ff",
	};

	return (
		<section className={`${styles["platform-stats-section"]}`}>
			<h2 className={`${styles["platform-stats-title"]}`}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					className={`${styles["platform-stats-title-icon"]}`}
				/>
				<span>投稿状況</span>
			</h2>
			<div className={`${styles["platform-stats-container"]}`}>
				<div className={`${styles["platform-stats-grid"]}`}>
					<div className={`${styles["platform-stat-card"]} ${styles["platform-stat-card-zenn"]}`}>
						<div className={`${styles["platform-stat-card-content"]}`}>
							<h3 className={`${styles["platform-stat-card-title"]}`}>{zennStat.platform}</h3>
							<div className={`${styles["platform-stat-count"]}`}>
								<em className={`${styles["platform-stat-count-em"]}`}>{zennStat.count}</em>
								<span className={`${styles["platform-stat-unit"]}`}>記事</span>
							</div>
						</div>
					</div>
				</div>
				{/* Xへのシェアリンク */}
				<XShareButton
					level={zennStat.count}
					username=""
					customText="Zennの投稿数をXでシェアする"
					customShareText={`【新たな記録！】\n\n⭐️ 勇者は Zennの投稿数が「${zennStat.count}本」になった！\n\n`}
					className={`${styles["platform-stat-share-link"]}`}
					iconWrapClassName={`${styles["platform-stat-share-icon-wrap"]}`}
					iconClassName={`${styles["platform-stat-share-icon"]}`}
					textClassName={`${styles["platform-stat-share-link-text"]}`}
					iconWidth={11}
					iconHeight={11}
					isGuestUser={isGuestUser}
				/>
			</div>
		</section>
	);
};

export default DashboardPlatformStatsSection;
