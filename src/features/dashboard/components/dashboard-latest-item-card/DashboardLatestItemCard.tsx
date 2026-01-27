"use client";

import Link from "next/link";
import Image from "next/image";
import plate01Image from "@/../public/images/plate/plate01.png";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import styles from "./DashboardLatestItemCard.module.css";
import { customItemImages } from "@/features/items/data/itemsData";

type Props = {
	itemId: number;
	itemName: string;
	itemDescription: string;
};

const DashboardLatestItemCard = ({ itemId, itemName, itemDescription }: Props) => {
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

	return (
		<div className={`${styles["latest-item-box"]}`}>
			<Link
				href={`/items/${itemId}`}
				className={`${styles["latest-item-link"]}`}
				onClick={(e) => handleNavigation(e, `/items/${itemId}`)}
			>
				<div className={`${styles["latest-item-icon-box"]}`}>
					<Image
						src={plate01Image}
						alt="plate"
						width={1000}
						height={1000}
						preload={true}
						placeholder="blur"
						className={styles["latest-item-icon-plate"]}
					/>
					<Image
						src={
							customItemImages[itemId]
								? `/images/items-page/acquired-icon/${customItemImages[itemId]}`
								: "/images/items-page/unacquired-icon/mark_question.svg"
						}
						alt={itemName}
						width={1000}
						height={1000}
						className={`${styles["latest-item-icon"]} ${styles[`latest-item-icon-${itemId}`]}`}
					/>
				</div>
				<div className={`${styles["latest-item-info"]}`}>
					<div className={`${styles["latest-item-name-box"]}`}>
						<h3 className={`${styles["latest-item-name"]}`}>{itemName}</h3>
					</div>
					<p className={`${styles["latest-item-description"]}`}>{itemDescription}</p>
				</div>
			</Link>
		</div>
	);
};

export default DashboardLatestItemCard;
