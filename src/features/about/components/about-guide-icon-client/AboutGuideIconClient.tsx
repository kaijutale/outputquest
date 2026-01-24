"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../about-guide-section/AboutGuideSection.module.css";

interface AboutGuideIconClientProps {
	iconSrc: string;
	alt: string;
}

const AboutGuideIconClient: React.FC<AboutGuideIconClientProps> = ({ iconSrc, alt }) => {
	const [showSkeleton, setShowSkeleton] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);

	// 最大2.5秒でタイムアウト（UX観点で適切な上限）
	useEffect(() => {
		setImageLoaded(false);
		setShowSkeleton(true);
		const timer = setTimeout(() => setShowSkeleton(false), 2500);
		return () => clearTimeout(timer);
	}, [iconSrc]);

	// 画像が読み込まれたら即座にスケルトンを非表示
	useEffect(() => {
		if (imageLoaded) {
			setShowSkeleton(false);
		}
	}, [imageLoaded]);

	return (
		<div className={styles["about-icon-wrapper"]}>
			<Image
				src={iconSrc}
				alt={alt}
				width={1000}
				height={1000}
				priority={true}
				onLoad={() => setImageLoaded(true)}
				className={styles["about-section-list-content-icon"]}
			/>
			{showSkeleton && <div className={styles["about-icon-skeleton"]} />}
		</div>
	);
};

export default AboutGuideIconClient;
