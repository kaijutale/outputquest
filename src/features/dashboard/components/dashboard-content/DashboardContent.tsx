import { Suspense } from "react";
import styles from "./DashboardContent.module.css";

// Components
import DashboardHeroSection from "../dashboard-hero-section/DashboardHeroSection";
import DashboardPlatformStatsSection from "../dashboard-platform-stats-section/DashboardPlatformStatsSection";
import DashboardActivitySection from "../dashboard-activity-section/DashboardActivitySection";
import DashboardLatestPartyMemberSection from "../dashboard-latest-party-member-section/DashboardLatestPartyMemberSection";
import DashboardLatestItemSection from "../dashboard-latest-item-section/DashboardLatestItemSection";

// Skeletons
import DashboardHeroSkeleton from "../dashboard-hero-skeleton/DashboardHeroSkeleton";
import DashboardPlatformStatsSkeleton from "../dashboard-platform-stats-skeleton/DashboardPlatformStatsSkeleton";
import DashboardActivitySkeleton from "../dashboard-activity-skeleton/DashboardActivitySkeleton";
import DashboardLatestPartyMemberSkeleton from "../dashboard-latest-party-member-skeleton/DashboardLatestPartyMemberSkeleton";
import DashboardLatestItemSkeleton from "../dashboard-latest-item-skeleton/DashboardLatestItemSkeleton";

const DashboardContent = () => {
	return (
		<div className={styles["dashboard-content-container"]}>
			<Suspense fallback={<DashboardHeroSkeleton />}>
				<DashboardHeroSection />
			</Suspense>

			<hr />

			<div className={styles["dashboard-zenn-area"]}>
				<Suspense fallback={<DashboardPlatformStatsSkeleton />}>
					<DashboardPlatformStatsSection />
				</Suspense>

				<hr className="block md:hidden" />

				<Suspense fallback={<DashboardActivitySkeleton />}>
					<DashboardActivitySection />
				</Suspense>
			</div>

			<hr />

			<Suspense fallback={<DashboardLatestPartyMemberSkeleton />}>
				<DashboardLatestPartyMemberSection />
			</Suspense>

			<hr />

			<Suspense fallback={<DashboardLatestItemSkeleton />}>
				<DashboardLatestItemSection />
			</Suspense>
		</div>
	);
};

export default DashboardContent;
