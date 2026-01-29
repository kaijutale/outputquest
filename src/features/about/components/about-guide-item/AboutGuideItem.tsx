import styles from "./AboutGuideItem.module.css";
import Image from "next/image";
import { AboutGuideItem as AboutGuideItemType } from "@/features/about/constants/aboutData";

type Props = AboutGuideItemType;

export default function AboutGuideItem({ title, description, iconSrc, alt }: Props) {
	return (
		<div className={styles["about-guide-item-content"]}>
			<dt className={styles["about-guide-item-title"]}>
				<div className={styles["about-guide-icon-wrapper"]}>
					<Image
						src={iconSrc}
						alt={alt}
						width={100}
						height={100}
						preload={true}
						className={styles["about-guide-icon-image"]}
					/>
				</div>
				<span>{title}</span>
			</dt>
			<dd className={styles["about-guide-item-description"]}>{description}</dd>
		</div>
	);
}
