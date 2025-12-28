"use client";

import { createContext, use, useState, ReactNode } from "react";

interface HomeAnimationContextType {
	isAnimationStarted: boolean;
	startAnimation: () => void;
	isImageVisible: boolean;
	showImage: () => void;
}

const HomeAnimationContext = createContext<HomeAnimationContextType | null>(null);

export const HomeAnimationProvider = ({ children }: { children: ReactNode }) => {
	const [isAnimationStarted, setIsAnimationStarted] = useState(false);
	const [isImageVisible, setIsImageVisible] = useState(false);

	const startAnimation = () => {
		setIsAnimationStarted(true);
	};
	const showImage = () => {
		setIsImageVisible(true);
	};

	return (
		<HomeAnimationContext value={{ isAnimationStarted, startAnimation, isImageVisible, showImage }}>
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
		};
	}
	return context;
};
