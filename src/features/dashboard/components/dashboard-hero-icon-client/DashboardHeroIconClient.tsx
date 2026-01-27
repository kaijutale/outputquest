"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./DashboardHeroIconClient.module.css";

interface DashboardHeroIconClientProps {
	heroName: string;
}

const DashboardHeroIconClient: React.FC<DashboardHeroIconClientProps> = ({ heroName }) => {
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
		<div className={styles["dashboard-hero-icon-box"]}>
			<Image
				src="/images/hero/hero_plate.png"
				alt={heroName}
				width={550}
				height={550}
				preload={true}
				onLoad={() => setImageLoaded(true)}
				className={styles["dashboard-hero-icon-image"]}
			/>
			{showSkeleton && <div className={styles["dashboard-hero-icon-skeleton"]} />}
		</div>
	);
};

export default DashboardHeroIconClient;
