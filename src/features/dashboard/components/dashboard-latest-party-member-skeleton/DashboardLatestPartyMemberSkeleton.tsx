import styles from "./DashboardLatestPartyMemberSkeleton.module.css";

const DashboardLatestPartyMemberSkeleton = () => {
	return (
		<section className={styles["skeleton-latest-section"]}>
			<h2 className={styles["skeleton-section-title"]} />
			<div className={styles["skeleton-party-member-container"]}>
				<div className={styles["skeleton-party-member-guest"]} />
			</div>
			{/* Party Member Share Link */}
			<div className={styles["skeleton-party-share"]} />
		</section>
	);
};

export default DashboardLatestPartyMemberSkeleton;
