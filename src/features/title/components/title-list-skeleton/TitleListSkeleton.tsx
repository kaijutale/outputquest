import styles from "./TitleListSkeleton.module.css";

const TitleListSkeleton = () => {
	return (
		<ul className={styles["skeleton-list"]}>
			{[...Array(11)].map((_, index) => (
				<li key={index} className={styles["skeleton-item"]}>
					<div className={styles["skeleton-item-box"]}>
						{/* 称号名のスケルトン */}
						<div className={styles["skeleton-title"]} />
					</div>
				</li>
			))}
		</ul>
	);
};

export default TitleListSkeleton;
