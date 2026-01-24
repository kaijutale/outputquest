import styles from "./AboutGuideSection.module.css";
import { AboutGuideItem as AboutGuideItemType } from "../../constants/aboutData";
import AboutGuideIconClient from "../about-guide-icon-client/AboutGuideIconClient";

type Props = AboutGuideItemType;

export default function AboutGuideItem({ title, description, iconSrc, alt }: Props) {
	return (
		<div className={styles["about-section-list-content"]}>
			<dt className={styles["about-section-list-content-title"]}>
				<AboutGuideIconClient iconSrc={iconSrc} alt={alt} />
				<span>{title}</span>
			</dt>
			<dd className={styles["about-section-list-content-description"]}>{description}</dd>
		</div>
	);
}
