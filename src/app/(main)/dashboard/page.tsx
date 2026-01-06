import { Metadata } from "next";
import { Suspense } from "react";
import { getPageMetadata } from "@/config/metadata";
import styles from "./DashboardPage.module.css";
import * as Dashboard from "@/features/dashboard/components";

export const metadata: Metadata = getPageMetadata("dashboard");

const DashboardPage = () => {
	return (
		<>
			<h1 className={`${styles["dashboard-title"]}`}>ダッシュボード</h1>
			<div className={styles["dashboard-content-wrapper"]}>
				<Suspense fallback={<Dashboard.DashboardActivitySkeleton />}>
					<Dashboard.DashboardContent />
				</Suspense>
			</div>
		</>
	);
};

export default DashboardPage;
