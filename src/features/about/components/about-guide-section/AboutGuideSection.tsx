import { AboutSectionTitle } from "..";
import AboutGuideItem from "./AboutGuideItem";
import styles from "./AboutGuideSection.module.css";
import { ABOUT_GUIDE_ITEMS } from "../../constants/aboutData";

export default function AboutGuideSection() {
	return (
		<section className={`${styles["about-section"]}`}>
			<AboutSectionTitle title="冒険ガイド" />
			<dl className={styles["about-section-list"]}>
				{ABOUT_GUIDE_ITEMS.map((item) => (
					<AboutGuideItem key={item.title} {...item} />
				))}
			</dl>
		</section>
	);
}
