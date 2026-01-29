"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

type ViewState = "initial" | "video" | "gap" | "image";

export function HeroBg() {
	const [viewState, setViewState] = useState<ViewState>("initial");
	const { isAnimationStarted, startAnimation, showImage, isFirstVisit } = useHomeAnimation();

	useEffect(() => {
		if (isFirstVisit === null) return;

		if (isFirstVisit) {
			setViewState("video");
		} else {
			setViewState("image");
		}
	}, [isFirstVisit]);

	const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
		const currentTime = e.currentTarget.currentTime;

		// 1. 動画再生3秒後にタイトルと王冠のアニメーション開始（＆オーバーレイ表示）
		if (currentTime >= 1.5 && !isAnimationStarted) {
			startAnimation();
		}

		// 2. タイトル表示完了後（約6秒後）に動画フェードアウト開始
		// アニメーション開始(3s) + フェードイン時間(2s) + 余韻(1s)
		if (viewState === "video" && currentTime >= 5.5) {
			setViewState("gap");
		}
	};

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-black">
			{/* Image Layer */}
			<motion.div
				className="absolute inset-0 size-full"
				initial={{ opacity: 0 }}
				animate={{ opacity: viewState === "image" ? 1 : 0 }}
				transition={{ duration: isFirstVisit ? 3 : 0, ease: "easeInOut" }}
			>
				<Image
					src="/images/top-bg/opening.jpg"
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-center"
				/>
			</motion.div>

			{/* Video Layer */}
			<AnimatePresence
				onExitComplete={() => {
					// 動画が完全に消えたら（exitアニメーション完了後）
					setViewState("image");
					showImage();
				}}
			>
				{viewState === "video" && (
					<motion.video
						key="hero-video"
						src="/videos/top-bg/opening.mp4"
						className="absolute inset-0 size-full object-cover"
						autoPlay
						muted
						playsInline
						onTimeUpdate={handleTimeUpdate}
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
					/>
				)}
			</AnimatePresence>

			{/* Overlay: アニメーション開始時（3秒後）にフェードインで表示 */}
			<div
				className={`absolute inset-0 bg-black/10 backdrop-blur-[3px] ${
					isFirstVisit ? "transition-opacity duration-2000" : ""
				} ${isAnimationStarted ? "opacity-100" : "opacity-0"}`}
			/>
		</div>
	);
}
