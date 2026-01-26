import { Suspense } from "react";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import styles from "./TitlePage.module.css";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import TitlePageContent from "@/features/title/components/title-page-content/TitlePageContent";

export const metadata: Metadata = getPageMetadata("title");

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
