import { Suspense } from "react";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import styles from "./ExplorePage.module.css";
import * as Explore from "@/features/explore/components";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import { getUser } from "@/features/user/_lib/fetcher";

export const metadata: Metadata = getPageMetadata("explore");

// Server Componentでユーザー情報を取得するラッパー
const ExplorePageContent = async () => {
	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <Explore.ExplorePageClient initialZennUsername={initialZennUsername} />;
};

const ExplorePage = () => {
	return (
		<>
			<div className={styles["title-bg"]}></div>
			<h1 className={`${styles["explore-title"]}`}>記事探索</h1>
			<div className={`${styles["explorer-container"]}`}>
				<Suspense
					fallback={
						<div className="grid place-items-center pt-4">
							<LoadingIndicator text="読み込み中" className={styles["loading-indicator"]} />
						</div>
					}
				>
					<ExplorePageContent />
				</Suspense>
			</div>
		</>
	);
};

export default ExplorePage;
