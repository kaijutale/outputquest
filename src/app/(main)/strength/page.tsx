import { Metadata } from "next";
import { Suspense } from "react";
import { getPageMetadata } from "@/config/metadata";
import styles from "./StrengthPage.module.css";
import * as Strength from "@/features/strength/components/index";

export const metadata: Metadata = getPageMetadata("strength");

const StrengthPage = () => {
	return (
		<>
			<h1 className={`${styles["strength-title"]}`}>つよさ</h1>
			<div className={`${styles["strength-container"]}`}>
				<div className={styles["strength-content"]}>
					{/* （左上）勇者のコンテンツ */}
					<div className={styles["strength-hero-wrapper"]}>
						<Suspense fallback={<Strength.StrengthHeroInfoSkeleton />}>
							<Strength.StrengthHeroInfo />
						</Suspense>
					</div>
					{/* （右上）冒険ログ */}
					<Strength.StrengthLogInfo />
					{/* （下）称号 */}
					<Strength.StrengthTitleInfo />
				</div>
			</div>
		</>
	);
};

export default StrengthPage;
