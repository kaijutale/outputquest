import styles from "./DashboardLatestPartyMemberSkeleton.module.css";
import Image from "next/image";

const DashboardLatestPartyMemberSkeleton = () => {
	return (
		<section className={styles["skeleton-latest-section"]}>
			<h2 className={styles["skeleton-section-title"]}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					preload={true}
					className={`${styles["skeleton-section-title-icon"]}`}
				/>
				<span>最近仲間に加わったキャラクター</span>
			</h2>
			<div className={styles["skeleton-party-member-container"]}>
				<div className={styles["skeleton-party-member-guest"]} />
			</div>
			{/* Party Member Share Link */}
			<div className={styles["skeleton-party-share"]} />
		</section>
	);
};

export default DashboardLatestPartyMemberSkeleton;
