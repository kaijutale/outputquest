import styles from "./AboutGuideItem.module.css";
import { AboutGuideItem as AboutGuideItemType } from "../../constants/aboutData";
import * as About from "../index";

type Props = AboutGuideItemType;

export default function AboutGuideItem({ title, description, iconSrc, alt }: Props) {
	return (
		<div className={styles["about-guide-item-content"]}>
			<dt className={styles["about-guide-item-title"]}>
				<About.AboutGuideIconClient iconSrc={iconSrc} alt={alt} />
				<span>{title}</span>
			</dt>
			<dd className={styles["about-guide-item-description"]}>{description}</dd>
		</div>
	);
}
