"use client";

import { motion } from "motion/react";
import { FC } from "react";
import styles from "./HomeAnimatedTitle.module.css";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

const HomeAnimatedTitle: FC = () => {
	const { isAnimationStarted } = useHomeAnimation();

	return (
		<motion.div
			className={`${styles["title-container"]}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: isAnimationStarted ? 1 : 0 }}
			transition={{
				duration: 3.5,
				delay: 0.7,
				ease: "easeInOut",
			}}
		>
			<h1 className={`${styles["title"]}`}>
				<span>OUTPUT</span>
				<span>QUEST</span>
			</h1>
			<h2 className={`${styles["subtitle"]}`}>−叡智の継承者−</h2>
		</motion.div>
	);
};

export default HomeAnimatedTitle;
