import { Suspense } from "react";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import styles from "./TitlePage.module.css";
import * as Title from "@/features/title/components";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import { getUser } from "@/features/user/_lib/fetcher";

export const metadata: Metadata = getPageMetadata("title");

// Server Componentでユーザー情報を取得するラッパー
const TitlePageContent = async () => {
	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <Title.TitlePageClient initialZennUsername={initialZennUsername} />;
};

const TitlePage = () => {
	return (
		<>
			<div className={styles["title-bg"]}></div>
			<h1 className={`${styles["title-page-title"]}`}>称号リスト</h1>
			<Suspense
				fallback={
					<div className={`${styles["title-page-container"]}`}>
						<div className="grid place-items-center pt-4">
							<LoadingIndicator text="読み込み中" />
						</div>
					</div>
				}
			>
				<TitlePageContent />
			</Suspense>
		</>
	);
};

export default TitlePage;
