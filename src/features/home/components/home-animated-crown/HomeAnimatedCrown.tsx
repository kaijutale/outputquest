"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useHomeAnimation } from "@/features/home/contexts/HomeAnimationContext";

const HomeAnimatedCrown = () => {
	const { isAnimationStarted, isFirstVisit } = useHomeAnimation();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isAnimationStarted ? 1 : 0 }}
			transition={{
				duration: isFirstVisit ? 3.5 : 0,
				delay: isFirstVisit ? 0.7 : 0,
				ease: "easeInOut",
			}}
		>
			<Image src="/images/crown/crown01.png" alt="crown" width={100} height={100} priority={true} />
		</motion.div>
	);
};

export default HomeAnimatedCrown;
