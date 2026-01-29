import Image from "next/image";
import styles from "./DashboardActivitySkeleton.module.css";

const DashboardActivitySkeleton = () => {
	return (
		<section className={styles["skeleton-activity-section"]}>
			<h2 className={styles["skeleton-activity-title"]}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					preload={true}
					className={`${styles["skeleton-activity-title-icon"]}`}
				/>
				<span>最近の記録</span>
			</h2>

			<ul className={styles["skeleton-activity-list"]}>
				{[...Array(3)].map((_, index) => (
					<li key={index} className={styles["skeleton-activity-item"]}>
						<div className={styles["skeleton-activity-item-link"]}>
							<div className={styles["skeleton-activity-item-content"]}>
								{/* Title */}
								<div className={styles["skeleton-activity-item-title"]} />

								<hr />

								{/* Category and Date */}
								<div className={styles["skeleton-activity-item-info"]}>
									<div className={styles["skeleton-category"]} />
									<div className={styles["skeleton-date"]} />
								</div>

								{/* Platform (favicon + name) */}
								<div className={styles["skeleton-activity-item-platform-container"]}>
									<div className={styles["skeleton-favicon"]} />
									<div className={styles["skeleton-platform"]} />
								</div>
							</div>

							{/* EXP */}
							<div className={styles["skeleton-activity-item-exp"]} />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default DashboardActivitySkeleton;
