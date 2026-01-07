"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { Howl } from "howler";
import Image from "next/image";
import styles from "./AudioPlayer.module.css";
import { useAudio } from "@/contexts/AudioContext";
import { usePathname } from "next/navigation";

interface AudioPlayerProps {
	src: string;
	className?: string;
	volume?: number;
}

const AudioPlayer = memo(({ src, className = "audio-button", volume = 1 }: AudioPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const { isMuted, toggleMute } = useAudio();
	const [sound, setSound] = useState<Howl | null>(null);

	const handleClick = useCallback(() => {
		toggleMute();
	}, [toggleMute]);

	const pathname = usePathname();
	const isHome = pathname === "/";

	useEffect(() => {
		const newSound = new Howl({
			src: [src],
			volume: volume,
			html5: true,
			autoplay: false,
			loop: true,
			onplay: () => setIsPlaying(true),
			onpause: () => setIsPlaying(false),
			onstop: () => setIsPlaying(false),
			onloaderror: (id: number, error: unknown) => console.error("Error loading audio:", error),
			onplayerror: (id: number, error: unknown) => {
				console.error("Error playing audio:", error);
				setIsPlaying(false);
			},
		});

		setSound(newSound);
		return () => {
			newSound.unload();
		};
	}, [src, volume]);

	useEffect(() => {
		if (!sound) return;
		sound.mute(isMuted);

		if (!isMuted && !isPlaying) {
			sound.play();
		}
	}, [sound, isMuted, isPlaying]);

	return (
		<div className={styles["audio-button-container"]}>
			<button
				onClick={handleClick}
				className={`${styles["audio-button"]} ${className}`}
				aria-label={isMuted ? "Unmute" : "Mute"}
			>
				{isMuted ? (
					<Image
						src="/images/button/volume-buttons/volume-button-mute.png"
						alt="Muted"
						width={100}
						height={100}
						className={`${styles["audio-mute"]} ${isHome ? styles["audio-mute-home"] : ""}`}
						priority={true}
					/>
				) : (
					<Image
						src="/images/button/volume-buttons/volume-button-play.png"
						alt="Playing"
						width={100}
						height={100}
						className={`${styles["audio-play"]} ${isHome ? styles["audio-play-home"] : ""}`}
						priority={true}
					/>
				)}
			</button>
		</div>
	);
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
