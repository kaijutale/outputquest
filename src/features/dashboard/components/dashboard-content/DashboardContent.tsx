import { Suspense } from "react";
import styles from "./DashboardContent.module.css";

// Components
import DashboardHeroSection from "@/features/dashboard/components/dashboard-hero-section/DashboardHeroSection";
import DashboardPlatformStatsSection from "@/features/dashboard/components/dashboard-platform-stats-section/DashboardPlatformStatsSection";
import DashboardActivitySection from "@/features/dashboard/components/dashboard-activity-section/DashboardActivitySection";
import DashboardLatestPartyMemberSection from "@/features/dashboard/components/dashboard-latest-party-member-section/DashboardLatestPartyMemberSection";
import DashboardLatestItemSection from "@/features/dashboard/components/dashboard-latest-item-section/DashboardLatestItemSection";

// Skeletons
import DashboardHeroSkeleton from "@/features/dashboard/components/dashboard-hero-skeleton/DashboardHeroSkeleton";
import DashboardPlatformStatsSkeleton from "@/features/dashboard/components/dashboard-platform-stats-skeleton/DashboardPlatformStatsSkeleton";
import DashboardActivitySkeleton from "@/features/dashboard/components/dashboard-activity-skeleton/DashboardActivitySkeleton";
import DashboardLatestPartyMemberSkeleton from "@/features/dashboard/components/dashboard-latest-party-member-skeleton/DashboardLatestPartyMemberSkeleton";
import DashboardLatestItemSkeleton from "@/features/dashboard/components/dashboard-latest-item-skeleton/DashboardLatestItemSkeleton";

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
