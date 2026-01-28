"use client";

import Image from "next/image";
import styles from "./AboutGuideIconClient.module.css";
import { useSkeletonWithTimeout } from "@/hooks/useSkeletonWithTimeout";

interface AboutGuideIconClientProps {
	iconSrc: string;
	alt: string;
}

const AboutGuideIconClient: React.FC<AboutGuideIconClientProps> = ({ iconSrc, alt }) => {
	const { showSkeleton, onImageLoad } = useSkeletonWithTimeout([iconSrc]);

	return (
		<div className={styles["about-guide-icon-wrapper"]}>
			<Image
				src={iconSrc}
				alt={alt}
				width={1000}
				height={1000}
				preload={true}
				onLoad={onImageLoad}
				className={styles["about-guide-icon-image"]}
			/>
			{showSkeleton && <div className={styles["about-guide-icon-skeleton"]} />}
		</div>
	);
};

export default AboutGuideIconClient;
