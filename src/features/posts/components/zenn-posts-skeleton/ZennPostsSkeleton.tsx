import styles from "./ZennPostsSkeleton.module.css";

const ZennPostsSkeleton = () => {
	return (
		// 記事一覧グリッドのスケルトン
		<div className={styles["skeleton-grid"]}>
			{[...Array(15)].map((_, index) => (
				<div key={index} className={styles["skeleton-item"]}>
					<div className={styles["skeleton-card"]}>
						{/* タイトル部分 */}
						<div className={styles["skeleton-title"]} />

						{/* 区切り線 */}
						<div className={styles["skeleton-divider"]} />

						{/* カテゴリーと日付 */}
						<div className={styles["skeleton-info"]}>
							<div className={styles["skeleton-category"]} />
							<div className={styles["skeleton-date"]} />
						</div>

						{/* プラットフォーム名 */}
						<div className={styles["skeleton-platform"]}>
							<div className={styles["skeleton-favicon"]} />
							<div className={styles["skeleton-platform-text"]} />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ZennPostsSkeleton;
