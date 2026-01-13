"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import { useAudio } from "@/contexts/AudioContext";
import styles from "./HomeStartButton.module.css";
import Image from "next/image";
import { motion } from "motion/react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

const HomeStartButton = () => {
	const router = useRouter();
	const { user, isLoaded } = useUser();
	const [isZennConnected, setIsZennConnected] = useState(false);
	const { isMuted } = useAudio();
	const { isImageVisible, isFirstVisit } = useHomeAnimation();

	const { playClickSound } = useClickSound({
		soundPath: "/audio/start-sound.mp3",
		volume: 1,
	});

	useEffect(() => {
		if (isLoaded && user) {
			const fetchUserStatus = async () => {
				try {
					const response = await fetch("/api/user");
					if (response.ok) {
						const data = await response.json();
						if (data.success && data.user && data.user.zennUsername) {
							setIsZennConnected(true);
						}
					}
				} catch (error) {
					console.error("Failed to fetch user status:", error);
				}
			};
			fetchUserStatus();
		}
	}, [isLoaded, user]);

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
				/>
				<Image
					src="/images/button/start-button/start-button-hover.png"
					alt="はじめる - ホバー"
					width={1000}
					height={1000}
					className={styles["start-btn-image-hover"]}
				/>
			</Link>
		</motion.div>
	);
};

export default HomeStartButton;
