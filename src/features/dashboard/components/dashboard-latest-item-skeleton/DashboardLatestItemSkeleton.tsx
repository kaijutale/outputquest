import styles from "./DashboardLatestItemSkeleton.module.css";
import Image from "next/image";

const DashboardLatestItemSkeleton = () => {
	return (
		<section className={styles["skeleton-latest-section"]}>
			<h2 className={styles["skeleton-section-title"]}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					preload={true}
					className={`${styles["skeleton-section-title-icon"]}`}
				/>
				<span>最近入手したアイテム</span>
			</h2>
			<div className={styles["skeleton-last-item-container"]}>
				<div className={styles["skeleton-last-item-guest"]} />
			</div>
			{/* Last Item Share Link */}
			<div className={styles["skeleton-item-share"]} />
		</section>
	);
};

export default DashboardLatestItemSkeleton;
