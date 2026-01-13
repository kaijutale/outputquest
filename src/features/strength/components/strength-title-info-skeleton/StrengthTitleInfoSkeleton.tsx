import styles from "./StrengthTitleInfoSkeleton.module.css";

const StrengthTitleInfoSkeleton = () => {
	return (
		<div className={styles["skeleton-container"]}>
			<div className={styles["skeleton-content"]}>
				<div className={styles["skeleton-box"]}>
					<h2 className={styles["skeleton-title"]}>称号</h2>
					<div className={styles["skeleton-detail-bg"]}>
						<div className={styles["skeleton-detail"]}>
							<div className={styles["skeleton-detail-content"]}>
								<div className={styles["skeleton-text"]} />
							</div>
						</div>
					</div>
					<div className={styles["skeleton-link-box"]}>
						<div className={styles["skeleton-link"]} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StrengthTitleInfoSkeleton;
