"use client";

import Image from "next/image";
import styles from "./AboutGuideIconClient.module.css";

interface AboutGuideIconClientProps {
	iconSrc: string;
	alt: string;
}

const AboutGuideIconClient: React.FC<AboutGuideIconClientProps> = ({ iconSrc, alt }) => {
	return (
		<div className={styles["about-guide-icon-wrapper"]}>
			<Image
				src={iconSrc}
				alt={alt}
				width={100}
				height={100}
				preload={true}
				placeholder="blur"
				blurDataURL={iconSrc}
				className={styles["about-guide-icon-image"]}
			/>
		</div>
	);
};

export default AboutGuideIconClient;
