import styles from "./StrengthLogInfoSkeleton.module.css"
import skeletonStyles from "./StrengthLogInfoSkeleton.module.css";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";

/**
 * 冒険ログのローディングスケルトン
 */
const StrengthLogInfoSkeleton = () => {
	return (
		<div className={styles["strength-log-info"]}>
			<div className={styles["strength-log-info-content"]}>
				<div className={styles["strength-log-box"]}>
					<h2 className={styles["strength-log-title"]}>冒険ログ</h2>
					<div className={styles["strength-log-list-content"]}>
						<div className={styles["strength-log-list-box"]}>
							<ul className={`${styles["strength-log-list"]} ${skeletonStyles["skeleton-list"]}`}>
								<li className={styles["strength-log-item"]}>
									<div className={styles["strength-log-loading-text"]}>
										<LoadingIndicator text="読み込み中" className={styles["loading-indicator"]} />
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className={styles["strength-log-link-box"]}>
						<span className={skeletonStyles["skeleton-link"]}>過去のログを全て確認する</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StrengthLogInfoSkeleton;
