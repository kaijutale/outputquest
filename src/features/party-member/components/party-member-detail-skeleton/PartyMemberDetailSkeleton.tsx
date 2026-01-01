import styles from "./PartyMemberDetailSkeleton.module.css";

const PartyMemberDetailSkeleton = () => {
	return (
		<div className={styles["skeleton-card"]}>
			<div className={styles["skeleton-bg"]} />
			<div className={styles["skeleton-card-content"]}>
				{/* メンバー画像のスケルトン */}
				<div className={styles["skeleton-image-box"]}>
					<div className={styles["skeleton-image"]} />
				</div>

				{/* メンバー名のスケルトン */}
				<div className={styles["skeleton-title-box"]}>
					<div className={styles["skeleton-title"]} />
				</div>

				{/* 説明文のスケルトン */}
				<div className={styles["skeleton-description-box"]}>
					<div className={styles["skeleton-description-line"]} />
				</div>
			</div>
		</div>
	);
};

export default PartyMemberDetailSkeleton;
