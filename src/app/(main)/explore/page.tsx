import { Suspense } from "react";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import styles from "./ExplorePage.module.css";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import ExplorePageContent from "@/features/explore/components/explore-page-content/ExplorePageContent";

export const metadata: Metadata = getPageMetadata("explore");

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
