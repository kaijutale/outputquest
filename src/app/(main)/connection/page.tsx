import { Suspense } from "react";
import { getPageMetadata } from "@/config/metadata";
import { Metadata } from "next";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import styles from "./ConnectionPage.module.css";
import ConnectionPageContent from "@/features/connection/components/connection-page-content/ConnectionPageContent";

export const metadata: Metadata = getPageMetadata("connection");

export default function ConnectionPage() {
	return (
		<Suspense
			fallback={
				<>
					<div className={styles["title-bg"]}></div>
					<h1 className={`${styles["profile-title"]}`}>連携</h1>
					<div className={`${styles["profile-container"]}`}>
						<div className="grid place-items-center pt-4">
							<LoadingIndicator text="読み込み中" />
						</div>
					</div>
				</>
			}
		>
			<ConnectionPageContent />
		</Suspense>
	);
}
