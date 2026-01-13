import { Suspense } from "react";
import * as Connection from "@/features/connection/components";
import { getPageMetadata } from "@/config/metadata";
import { Metadata } from "next";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import { getUser } from "@/features/user/_lib/fetcher";
import styles from "./ConnectionPage.module.css";

export const metadata: Metadata = getPageMetadata("connection");

// Server Componentでユーザー情報を取得するラッパー
const ConnectionPageContent = async () => {
	// TODO: スケルトンUI確認用 - 確認後削除
	await new Promise(() => {});

	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <Connection.ConnectionPageClient initialZennUsername={initialZennUsername} />;
};

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
