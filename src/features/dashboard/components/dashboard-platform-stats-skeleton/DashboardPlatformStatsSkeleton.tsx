import styles from "./DashboardPlatformStatsSkeleton.module.css";
import Image from "next/image";

const DashboardPlatformStatsSkeleton = () => {
	return (
		<section className={styles["skeleton-platform-stats"]}>
			<h2 className={styles["skeleton-section-title"]}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					className={`${styles["skeleton-section-title-icon"]}`}
				/>
				<span>投稿状況</span>
			</h2>
			<div className={styles["skeleton-platform-stats-container"]}>
				<div className={styles["skeleton-platform-card"]} />
				{/* Platform Stats Share Link */}
				<div className={styles["skeleton-platform-share"]} />
			</div>
		</section>
	);
};

export default DashboardPlatformStatsSkeleton;
