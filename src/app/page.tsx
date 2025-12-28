import dynamic from "next/dynamic";
import styles from "./Home.module.css";
import * as Home from "@/features/home/components/index";
import * as Hero from "@/features/hero/components";
import { HomeAnimationProvider } from "@/features/home/contexts/HomeAnimationContext";

// Motion使用コンポーネントを動的インポート（Client Bundleを最小化）
const HomeAnimatedTitle = dynamic(
	() => import("@/features/home/components/home-animated-title/HomeAnimatedTitle")
);
const HomeAnimatedCrown = dynamic(
	() => import("@/features/home/components/home-animated-crown/HomeAnimatedCrown")
);

export default function HomePage() {
	return (
		<HomeAnimationProvider>
			<main className={`${styles["main"]}`}>
				<Hero.HeroBg />
				<div className={`${styles["main-container"]}`}>
					<div className={`${styles["crown-container"]}`}>
						<HomeAnimatedCrown />
					</div>
					<HomeAnimatedTitle />
					<Home.HomeStartButton />
				</div>
			</main>
		</HomeAnimationProvider>
	);
}
