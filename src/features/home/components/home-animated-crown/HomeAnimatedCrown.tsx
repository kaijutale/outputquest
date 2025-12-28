"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

const HomeAnimatedCrown = () => {
	const { isAnimationStarted } = useHomeAnimation();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isAnimationStarted ? 1 : 0 }}
			transition={{ duration: 3.5, delay: 0.7, ease: "easeInOut" }}
		>
			<Image src="/images/crown/crown01.png" alt="crown" width={100} height={100} />
		</motion.div>
	);
};

export default HomeAnimatedCrown;
