import { Metadata } from "next";
import { Suspense } from "react";
import { getPageMetadata } from "@/config/metadata";
import styles from "./LogsPage.module.css";
import * as Logs from "@/features/logs/components";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";

export const metadata: Metadata = getPageMetadata("logs");

// ローディング用フォールバック
const LogsListSkeleton = () => (
	<ul className={styles["logs-page-list-skeleton"]}>
		<li className={styles["logs-page-list-item-skeleton"]}>
			<LoadingIndicator text="読み込み中" />
		</li>
	</ul>
);

const LogsPage = () => {
	return (
		<>
			<div className={styles["title-bg"]}></div>
			<h1 className={styles["logs-page-title"]}>冒険ログ</h1>
			<div className={styles["logs-page-container"]}>
				<Logs.LogsPageHeader />

				<hr className={styles["logs-page-line-first"]} />

				<Suspense fallback={<LogsListSkeleton />}>
					<Logs.LogsListWrapper />
				</Suspense>

				<hr className={styles["logs-page-line-second"]} />

				<Logs.LogsPageFooter />
			</div>
		</>
	);
};

export default LogsPage;
