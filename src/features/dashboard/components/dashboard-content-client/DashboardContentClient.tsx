"use client";

import { ReactNode } from "react";
import styles from "./DashboardContentClient.module.css";
import DashboardHeroSection from "../dashboard-hero-section/DashboardHeroSection";
import DashboardPlatformStatsSection from "../dashboard-platform-stats-section/DashboardPlatformStatsSection";
import DashboardLatestPartyMemberSection from "../dashboard-latest-party-member-section/DashboardLatestPartyMemberSection";
import DashboardLatestItemSection from "../dashboard-latest-item-section/DashboardLatestItemSection";
import { HeroData } from "@/types/hero.types";

type DashboardContentClientProps = {
	heroData: HeroData;
	lastAcquiredItemId: number | null;
	children: ReactNode;
};

const DashboardContentClient = ({
	heroData,
	lastAcquiredItemId,
	children,
}: DashboardContentClientProps) => {
	// ダミーデータ構築（Server Componentから渡されたデータを使用）
	const dashboardData = {
		heroData: heroData,
		postStats: [{ platform: "Zenn", count: 0, color: "#3ea8ff" }],
		recentActivity: [],
		lastItem: { id: lastAcquiredItemId || 0, name: "" },
	};

	return (
		<div className={`${styles["dashboard-content-container"]}`}>
			<DashboardHeroSection dashboardData={dashboardData} />

			<hr />

			<div className={styles["dashboard-zenn-area"]}>
				<DashboardPlatformStatsSection dashboardData={dashboardData} />

				<hr className="block md:hidden" />

				{/* Server ComponentをCompositionパターンで配置 */}
				{children}
			</div>

			<hr />
			<DashboardLatestPartyMemberSection />

			<hr />
			<DashboardLatestItemSection />
		</div>
	);
};

export default DashboardContentClient;
