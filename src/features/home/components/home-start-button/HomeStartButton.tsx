"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/hooks/useClickSound";
import { useAudio } from "@/contexts/AudioContext";
import { useZennConnectionStatus } from "@/hooks/useZennConnectionStatus";
import styles from "./HomeStartButton.module.css";
import Image from "next/image";
import { motion } from "motion/react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

const HomeStartButton = () => {
	const router = useRouter();
	const { isZennConnected } = useZennConnectionStatus();
	const { isMuted } = useAudio();
	const { isImageVisible, isFirstVisit } = useHomeAnimation();

	const { playClickSound } = useClickSound({
		soundPath: "/audio/start-sound.mp3",
		volume: 1,
	});

	const destination = isZennConnected ? "/connection" : "/about";

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		playClickSound();

		if (isMuted) {
			router.push(destination);
		} else {
			setTimeout(() => {
				router.push(destination);
			}, 700);
		}
	};

	return (
		<motion.div
			className={`${styles["start-btn-container"]} ${
				isImageVisible ? "pointer-events-auto" : "pointer-events-none"
			}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: isImageVisible ? 1 : 0 }}
			transition={{ duration: isFirstVisit ? 1.75 : 0, ease: "easeInOut" }}
		>
			<Link href={destination} className={`${styles["start-btn"]}`} onClick={handleClick}>
				<Image
					src="/images/button/start-button/start-button.png"
					alt="はじめる"
					width={1000}
					height={1000}
					className={styles["start-btn-image"]}
					preload={true}
				/>
				<Image
					src="/images/button/start-button/start-button-hover.png"
					alt="はじめる - ホバー"
					width={1000}
					height={1000}
					className={styles["start-btn-image-hover"]}
					preload={true}
				/>
			</Link>
		</motion.div>
	);
};

export default HomeStartButton;
