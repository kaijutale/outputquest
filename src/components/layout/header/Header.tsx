"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AudioPlayer from "@/components/common/audio/audio-player/AudioPlayer";
import { usePathname } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import HamburgerMenu from "@/components/elements/hamburger-menu/HamburgerMenu";
import Gnav from "@/components/layout/gnav/Gnav";
import styles from "./Header.module.css";
import Crown from "@/components/common/crown/Crown";
import { motion } from "motion/react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

export const Header = () => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { playClickSound } = useClickSound({
		soundPath: "/audio/return-sound.mp3",
		volume: 0.5,
	});

	// Audio player animation control
	const { isImageVisible, isFirstVisit } = useHomeAnimation();
	const isHome = pathname === "/";
	const shouldAnimateAudio = isHome;

	// audioPlayer の定義をここに移動
	const audioPlayer = (
		<motion.div
			initial={shouldAnimateAudio ? { opacity: 0 } : { opacity: 1 }}
			animate={shouldAnimateAudio ? { opacity: isImageVisible ? 1 : 0 } : { opacity: 1 }}
			transition={
				shouldAnimateAudio
					? { duration: isFirstVisit ? 1.75 : 0, ease: "easeInOut" }
					: { duration: 0 }
			}
		>
			<AudioPlayer src="/audio/outputquest-theme-song.mp3" volume={0.5} />
		</motion.div>
	);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// パスが変更されたときにメニューを閉じる
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	// メニューが開いているときに画面外をクリックすると閉じる
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const hamburger = document.querySelector(`.hamburger`);

			if (isMenuOpen && hamburger && !hamburger.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// スクロールロックの制御
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	return (
		<header className={`${styles["header"]}`}>
			<div className={`${pathname === "/" ? styles[""] : styles["header-bg"]}`}>
				<div
					className={`${styles["header-container"]} ${
						pathname === "/" ? styles["home-header-container"] : styles["child-header-container"]
					}`}
				>
					{pathname !== "/" && (
						<div className={`${styles["header__title"]}`}>
							<Link
								href="/"
								className={`${styles["header__title-link"]}`}
								onClick={() => playClickSound()}
							>
								<div className={`${styles["crown-container"]}`}>
									<Crown />
								</div>
								<span>OUTPUT QUEST</span>
							</Link>
						</div>
					)}
					<div className={`${styles["header__items"]}`}>
						{audioPlayer}
						{pathname !== "/" && <HamburgerMenu toggleMenu={toggleMenu} isOpen={isMenuOpen} />}
					</div>
				</div>

				<Gnav
					isMenuOpen={isMenuOpen}
					toggleMenu={toggleMenu}
					className={`${styles["header-gnav"]}`}
				/>
			</div>
		</header>
	);
};
