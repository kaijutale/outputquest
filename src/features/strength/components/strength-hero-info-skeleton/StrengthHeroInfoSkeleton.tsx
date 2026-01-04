import styles from "./StrengthHeroInfoSkeleton.module.css";

const StrengthHeroInfoSkeleton = () => {
	return (
		<div className={styles["skeleton-container"]}>
			<div className={styles["skeleton-content"]}>
				{/* タイトル */}
				<h2 className={styles["skeleton-title"]}>勇者のレベル</h2>

				{/* ヘッダー部分（アイコン + レベル） */}
				<div className={styles["skeleton-header"]}>
					{/* 勇者のアイコンと名前 */}
					<div className={styles["skeleton-hero-box"]}>
						<div className={styles["skeleton-icon"]} />
						<div className={styles["skeleton-name"]} />
					</div>

					{/* レベル表示 */}
					<div className={styles["skeleton-level-box"]}>
						<div className={styles["skeleton-level-display-box"]}>
							<div className={styles["skeleton-level"]} />
						</div>
					</div>
				</div>

				{/* 経験値バー */}
				<div className={styles["skeleton-progress"]}>
					<div className={styles["skeleton-progress-text"]}>
						<div className={styles["skeleton-progress-label"]} />
						<div className={styles["skeleton-progress-value"]} />
					</div>
					<div className={styles["skeleton-progress-bar"]}>
						<div className={styles["skeleton-progress-icon"]} />
						<div className={styles["skeleton-progress-gauge"]} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StrengthHeroInfoSkeleton;
