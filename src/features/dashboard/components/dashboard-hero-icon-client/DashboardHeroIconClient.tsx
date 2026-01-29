"use client";

import Image from "next/image";
import heroPlateImage from "@/../public/images/hero/hero_plate.png";
import styles from "./DashboardHeroIconClient.module.css";

interface DashboardHeroIconClientProps {
	heroName: string;
}

const DashboardHeroIconClient: React.FC<DashboardHeroIconClientProps> = ({ heroName }) => {
	return (
		<div className={styles["dashboard-hero-icon-box"]}>
			<Image
				src={heroPlateImage}
				alt={heroName}
				width={250}
				height={250}
				preload={true}
				className={styles["dashboard-hero-icon-image"]}
			/>
		</div>
	);
};

export default DashboardHeroIconClient;
