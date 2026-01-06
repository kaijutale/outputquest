"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import styles from "./DashboardLatestItemSection.module.css";
import { customItemImages } from "@/features/items/data/itemsData";

type Props = {
	itemId: number;
	itemName: string;
	itemDescription: string;
};

export const DashboardLatestItemCard = ({ itemId, itemName, itemDescription }: Props) => {
	const router = useRouter();
	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190,
	});

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	const itemImage = customItemImages[itemId];

	return (
		<div className={`${styles["last-item-box"]}`}>
			<Link
				href={`/items/${itemId}`}
				className={`${styles["last-item-link"]}`}
				onClick={(e) => handleNavigation(e, `/items/${itemId}`)}
			>
				<div className={`${styles["last-item-icon-box"]}`}>
					<Image
						src="/images/plate/plate01.png"
						alt="plate"
						width={1000}
						height={1000}
						priority={true}
						className={styles["last-item-icon-plate"]}
					/>
					{itemImage && (
						<Image
							src={`/images/items-page/acquired-icon/${itemImage}`}
							alt={itemName}
							width={1000}
							height={1000}
							className={`${styles["last-item-icon"]}`}
						/>
					)}
				</div>
				<div className={`${styles["last-item-info"]}`}>
					<div className={`${styles["last-item-name-box"]}`}>
						<h3 className={`${styles["last-item-name"]}`}>{itemName}</h3>
					</div>
					<p className={`${styles["last-item-description"]}`}>{itemDescription}</p>
				</div>
			</Link>
		</div>
	);
};
