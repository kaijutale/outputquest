"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../dashboard-hero-section/DashboardHeroSection.module.css";

interface HeroIconClientProps {
	heroName: string;
}

const HeroIconClient: React.FC<HeroIconClientProps> = ({ heroName }) => {
	const [showSkeleton, setShowSkeleton] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);

	// 最大2.5秒でタイムアウト（UX観点で適切な上限）
	useEffect(() => {
		const timer = setTimeout(() => setShowSkeleton(false), 2500);
		return () => clearTimeout(timer);
	}, []);

	// 画像が読み込まれたら即座にスケルトンを非表示
	useEffect(() => {
		if (imageLoaded) {
			setShowSkeleton(false);
		}
	}, [imageLoaded]);

	return (
		<div className={styles["hero-info-icon-box"]}>
			<Image
				src="/images/hero/hero_plate.png"
				alt={heroName}
				width={1000}
				height={1000}
				priority={true}
				onLoad={() => setImageLoaded(true)}
				className={styles["hero-info-icon-image"]}
			/>
			{showSkeleton && <div className={styles["hero-icon-skeleton"]} />}
		</div>
	);
};

export default HeroIconClient;
