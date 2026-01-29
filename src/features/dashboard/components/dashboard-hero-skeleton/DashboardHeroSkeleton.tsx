import styles from "./DashboardHeroSkeleton.module.css";
import Image from "next/image";

const DashboardHeroSkeleton = () => {
	return (
		<section className={styles["skeleton-hero-section"]}>
			<h2 className={styles["skeleton-hero-title"]}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					preload={true}
					className={`${styles["skeleton-hero-title-icon"]}`}
				/>
				<span>勇者のレベル</span>
			</h2>
			<div className={styles["skeleton-hero-container"]}>
				<div className={styles["skeleton-hero-info"]}>
					{/* 左側: アイコン + 名前 */}
					<div className={styles["skeleton-hero-box"]}>
						<div className={styles["skeleton-hero-icon-box"]}>
							<div className={styles["skeleton-hero-icon"]} />
						</div>
						<div className={styles["skeleton-hero-name-box"]}>
							<div className={styles["skeleton-hero-name"]} />
						</div>
					</div>

					{/* 右側: レベル + 経験値 */}
					<div className={styles["skeleton-hero-level"]}>
						<div className={styles["skeleton-hero-level-header"]}>
							<div className={styles["skeleton-hero-level-display"]} />
							<div className={styles["skeleton-hero-share"]} />
						</div>
						<div className={styles["skeleton-hero-progress-box"]}>
							<div className={styles["skeleton-hero-progress-text"]} />
							<div className={styles["skeleton-hero-progress-gauge-container"]}>
								<div className={styles["skeleton-hero-exp-icon"]} />
								<div className={styles["skeleton-hero-progress-gauge"]} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardHeroSkeleton;
