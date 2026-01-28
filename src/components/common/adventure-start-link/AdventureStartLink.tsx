"use client";

import styles from "./AdventureStartLink.module.css";
import Link from "next/link";
import Image from "next/image";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import { useZennConnectionStatus } from "@/hooks/useZennConnectionStatus";

const AdventureStartLink = () => {
	const { isZennConnected } = useZennConnectionStatus();
	const targetPath = isZennConnected ? "/dashboard" : "/connection";

	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190, // 190ミリ秒 = 0.19秒の遅延
	});

	return (
		<div className={`${styles["adventure-start-link-box"]}`}>
			<Link
				href={targetPath}
				className={`${styles["adventure-start-link"]}`}
				onClick={() => playClickSound()}
			>
				<Image
					src="/images/arrow/arrow-icon.svg"
					alt="冒険をはじめる"
					width={20}
					height={20}
					className={styles["adventure-start-link-icon"]}
				/>
				<span className={styles["adventure-start-link-text"]}>冒険をはじめる</span>
			</Link>
		</div>
	);
};

export default AdventureStartLink;
