import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import styles from "./AboutPage.module.css";
import * as About from "@/features/about/components";

export const metadata: Metadata = getPageMetadata("about");

const AboutPage = () => {
	return (
		<>
			<h1 className={`${styles["about-title"]}`}>OUTPUT QUESTとは ?</h1>
			<div className={`${styles["about-container"]}`}>
				<div className={`${styles["about-content"]} w-full`}>
					<article className={styles["about-article"]}>
						<About.AboutIntroductionSection />
						<About.AboutGuideSection />
						<About.AboutOutroSection />
					</article>
				</div>
			</div>
		</>
	);
};

export default AboutPage;
