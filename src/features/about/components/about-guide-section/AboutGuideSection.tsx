import styles from "./AboutGuideSection.module.css";
import { ABOUT_GUIDE_ITEMS } from "@/features/about/constants/aboutData";
import * as About from "@/features/about/components";

export default function AboutGuideSection() {
	return (
		<section className={`${styles["about-section"]}`}>
			<About.AboutSectionTitle title="冒険ガイド" />
			<dl className={styles["about-section-list"]}>
				{ABOUT_GUIDE_ITEMS.map((item) => (
					<About.AboutGuideItem key={item.title} {...item} />
				))}
			</dl>
		</section>
	);
}
