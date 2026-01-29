"use client";

import { createContext, use, useState, useEffect, ReactNode } from "react";
import { storage } from "@/utils/storage";

interface HomeAnimationContextType {
	isAnimationStarted: boolean;
	startAnimation: () => void;
	isImageVisible: boolean;
	showImage: () => void;
	isFirstVisit: boolean | null;
}

const HomeAnimationContext = createContext<HomeAnimationContextType | null>(null);

export const HomeAnimationProvider = ({ children }: { children: ReactNode }) => {
	const [isAnimationStarted, setIsAnimationStarted] = useState(false);
	const [isImageVisible, setIsImageVisible] = useState(false);
	const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

	useEffect(() => {
		// SSR中はsessionStorageにアクセスしない
		if (typeof window === "undefined") return;

		const hasVisited = storage.get("hero-visited", "session");

		if (hasVisited) {
			setIsFirstVisit(false);
			setIsAnimationStarted(true);
			setIsImageVisible(true);
		} else {
			setIsFirstVisit(true);
			storage.set("hero-visited", "true", "session");
		}
	}, []);

	const startAnimation = () => {
		setIsAnimationStarted(true);
	};
	const showImage = () => {
		setIsImageVisible(true);
	};

	return (
		<HomeAnimationContext
			value={{
				isAnimationStarted,
				startAnimation,
				isImageVisible,
				showImage,
				isFirstVisit,
			}}
		>
			{children}
		</HomeAnimationContext>
	);
};

export const useHomeAnimation = () => {
	const context = use(HomeAnimationContext);
	// コンテキスト外で使用された場合は、アニメーション済みとして扱う
	if (context === null) {
		// Providerの外で使用された場合のフォールバック
		return {
			isAnimationStarted: true,
			startAnimation: () => {},
			isImageVisible: true,
			showImage: () => {},
			isFirstVisit: false,
		};
	}
	return context;
};
