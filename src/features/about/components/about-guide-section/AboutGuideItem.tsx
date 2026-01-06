import Image from "next/image";
import styles from "./AboutGuideSection.module.css";
import { AboutGuideItem as AboutGuideItemType } from "../../constants/aboutData";

type Props = AboutGuideItemType;

export default function AboutGuideItem({ title, description, iconSrc, alt }: Props) {
	return (
		<div className={styles["about-section-list-content"]}>
			<dt className={styles["about-section-list-content-title"]}>
				<Image
					src={iconSrc}
					alt={alt}
					width={1000}
					height={1000}
					priority={true}
					className={`${styles["about-section-list-content-icon"]}`}
				/>
				<span>{title}</span>
			</dt>
			<dd className={styles["about-section-list-content-description"]}>{description}</dd>
		</div>
	);
}
