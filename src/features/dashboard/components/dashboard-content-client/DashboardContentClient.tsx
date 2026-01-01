"use client";

import { ReactNode } from "react";
import styles from "./DashboardContentClient.module.css";
import * as Dashboard from "@/features/dashboard/components";
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
			<Dashboard.DashboardHeroSection dashboardData={dashboardData} />

			<hr />

			<div className={styles["dashboard-zenn-area"]}>
				<Dashboard.DashboardPlatformStatsSection dashboardData={dashboardData} />

				<hr className="block md:hidden" />

				{/* Server ComponentをCompositionパターンで配置 */}
				{children}
			</div>

			<hr />
			<Dashboard.DashboardLatestPartyMemberSection />

			<hr />
			<Dashboard.DashboardLatestItemSection />
		</div>
	);
};

export default DashboardContentClient;
