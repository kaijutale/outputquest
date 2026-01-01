import styles from "./PartyListSkeleton.module.css";

const PartyListSkeleton = () => {
	return (
		<div className={styles["skeleton-grid"]}>
			{[...Array(12)].map((_, index) => (
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

export default PartyListSkeleton;
