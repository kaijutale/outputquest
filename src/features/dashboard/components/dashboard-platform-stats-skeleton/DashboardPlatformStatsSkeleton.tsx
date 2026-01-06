import styles from "./DashboardPlatformStatsSkeleton.module.css";

const DashboardPlatformStatsSkeleton = () => {
	return (
		<section className={styles["skeleton-platform-stats"]}>
			<h2 className={styles["skeleton-section-title"]} />
			<div className={styles["skeleton-platform-stats-container"]}>
				<div className={styles["skeleton-platform-card"]} />
				{/* Platform Stats Share Link */}
				<div className={styles["skeleton-platform-share"]} />
			</div>
		</section>
	);
};

export default DashboardPlatformStatsSkeleton;
