import styles from "./EquipmentListSkeleton.module.css";

const EquipmentListSkeleton = () => {
	return (
		<ul className={styles["skeleton-list"]}>
			{[...Array(6)].map((_, index) => (
				<li key={index} className={styles["skeleton-item"]}>
					<div className={styles["skeleton-item-content"]}>
						{/* アイテム画像のスケルトン */}
						<div className={styles["skeleton-image"]} />

						{/* アイテム名のスケルトン */}
						<div className={styles["skeleton-name"]} />

						{/* 説明文のスケルトン */}
						<div className={styles["skeleton-description"]}>
							<div className={styles["skeleton-description-line"]} />
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default EquipmentListSkeleton;
