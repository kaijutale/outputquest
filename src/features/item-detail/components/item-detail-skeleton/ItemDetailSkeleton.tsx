import styles from "./ItemDetailSkeleton.module.css";

const ItemDetailSkeleton = () => {
	return (
		<div className={styles["skeleton-card"]}>
			<div className={styles["skeleton-card-content"]}>
				{/* アイテム画像のスケルトン */}
				<div className={styles["skeleton-image-box"]}>
					<div className={styles["skeleton-image"]} />
				</div>

				{/* アイテム名のスケルトン */}
				<div className={styles["skeleton-title-box"]}>
					<div className={styles["skeleton-title"]} />
				</div>

				{/* 説明文のスケルトン */}
				<div className={styles["skeleton-description-box"]}>
					<div className={styles["skeleton-description-line"]} />
				</div>

				{/* レア度のスケルトン */}
				<div className={styles["skeleton-rarity-box"]}>
					<div className={styles["skeleton-rarity-label"]} />
					<div className={styles["skeleton-rarity-stars"]} />
				</div>
			</div>
		</div>
	);
};

export default ItemDetailSkeleton;
