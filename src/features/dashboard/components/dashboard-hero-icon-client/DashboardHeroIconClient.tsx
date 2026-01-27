"use client";

import Image from "next/image";
import heroPlateImage from "@/../public/images/hero/hero_plate.png";
import styles from "./DashboardHeroIconClient.module.css";
import { useSkeletonWithTimeout } from "@/hooks/useSkeletonWithTimeout";

interface DashboardHeroIconClientProps {
	heroName: string;
}

const DashboardHeroIconClient: React.FC<DashboardHeroIconClientProps> = ({ heroName }) => {
	const { showSkeleton, onImageLoad } = useSkeletonWithTimeout();

	return (
		<div className={styles["dashboard-hero-icon-box"]}>
			<Image
				src={heroPlateImage}
				alt={heroName}
				width={550}
				height={550}
				preload={true}
				placeholder="blur"
				onLoad={onImageLoad}
				className={styles["dashboard-hero-icon-image"]}
			/>
			{showSkeleton && <div className={styles["dashboard-hero-icon-skeleton"]} />}
		</div>
	);
};

export default DashboardHeroIconClient;
