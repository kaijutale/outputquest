import dynamic from "next/dynamic";
import { Suspense } from "react";
import styles from "./Home.module.css";
import * as Home from "@/features/home/components";
import * as Hero from "@/features/hero/components";
import { getUser } from "@/features/user/_lib/fetcher";

// Motion使用コンポーネントを動的インポート（Client Bundleを最小化）
const HomeAnimatedTitle = dynamic(
	() => import("@/features/home/components/home-animated-title/HomeAnimatedTitle")
);
const HomeAnimatedCrown = dynamic(
	() => import("@/features/home/components/home-animated-crown/HomeAnimatedCrown")
);

/**
 * スタートボタンをラップするServer Component
 * getUser()でZenn連携状態を取得し、propsで渡す
 */
async function HomeStartButtonWrapper() {
	const user = await getUser();
	const isZennConnected = user?.zennUsername !== null && user?.zennUsername !== undefined;

	return <Home.HomeStartButton isZennConnected={isZennConnected} />;
}

export default function HomePage() {
	return (
		<main className={`${styles["main"]}`}>
			<Hero.HeroBg />
			<div className={`${styles["main-container"]}`}>
				<div className={`${styles["crown-container"]}`}>
					<HomeAnimatedCrown />
				</div>
				<HomeAnimatedTitle />
				<Suspense fallback={null}>
					<HomeStartButtonWrapper />
				</Suspense>
			</div>
		</main>
	);
}
