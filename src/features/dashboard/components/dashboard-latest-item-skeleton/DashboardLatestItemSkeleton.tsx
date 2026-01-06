import styles from "./DashboardLatestItemSkeleton.module.css";

const DashboardLatestItemSkeleton = () => {
	return (
		<section className={styles["skeleton-latest-section"]}>
			<h2 className={styles["skeleton-section-title"]} />
			<div className={styles["skeleton-last-item-container"]}>
				<div className={styles["skeleton-last-item-guest"]} />
			</div>
			{/* Last Item Share Link */}
			<div className={styles["skeleton-item-share"]} />
		</section>
	);
};

export default DashboardLatestItemSkeleton;
