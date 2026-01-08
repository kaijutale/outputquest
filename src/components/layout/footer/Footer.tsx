"use client";

import { siteData } from "@/consts/site";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

export const Footer = () => {
	const pathname = usePathname();
	const isHome = pathname === "/";

	// HomeAnimationContextから値を取得（プロバイダー外の場合はデフォルト値を返す）
	const { isImageVisible, isFirstVisit } = useHomeAnimation();

	// ホーム画面かつ初回訪問時のみアニメーションを適用
	const shouldAnimate = isHome;

	return (
		<motion.footer
			className={`${styles["footer"]}`}
			initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
			animate={shouldAnimate ? { opacity: isImageVisible ? 1 : 0 } : { opacity: 1 }}
			transition={
				shouldAnimate ? { duration: isFirstVisit ? 1.75 : 0, ease: "easeInOut" } : { duration: 0 }
			}
		>
			<div
				className={`${styles["footer-container"]} ${
					isHome ? styles["home-position"] : styles["other-position"]
				}`}
			>
				<div className={`${styles["footer-box"]}`}>
					<small className={`${styles["footer-text"]} block text-[10px] font-black`}>
						© {siteData.siteMainTitle}
					</small>
				</div>
			</div>
		</motion.footer>
	);
};
