import styles from "./ItemListSkeleton.module.css";

const ItemListSkeleton = () => {
	return (
		<div className={styles["skeleton-grid"]}>
			{[...Array(30)].map((_, index) => (
				<div key={index} className={styles["skeleton-card-content"]}>
					<div className={styles["skeleton-card"]}>
						<div className={styles["skeleton-icon-wrapper"]}>
							<div className={styles["skeleton-icon"]} />
						</div>
						<div className={styles["skeleton-name"]} />
					</div>
				</div>
			))}
		</div>
	);
};

export default ItemListSkeleton;
