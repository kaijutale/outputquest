"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./ItemCardListClient.module.css";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import { Item } from "@/features/items/types/items.types";
import { customItemSilhouetteImages } from "@/features/items/data/itemsData";

interface ItemCardListClientProps {
	items: Item[];
	isGuestUser: boolean;
}

const ItemCardListClient: React.FC<ItemCardListClientProps> = ({ items, isGuestUser }) => {
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
		<div className={styles["items-grid"]}>
			{items.map((item) => (
				<div className={styles["item-card-content"]} key={item.id}>
					<Link
						href={`/items/${item.id}`}
						className={styles["item-card"]}
						onClick={(e) => handleNavigation(e, `/items/${item.id}`)}
					>
						{isGuestUser ? (
							<div className={styles["unacquired-item-icon"]}>
								<Image
									src="/images/plate/plate01.png"
									alt="plate"
									width={1000}
									height={1000}
									priority={true}
									className={styles["acquired-item-icon-plate"]}
								/>
								<Image
									src={`/images/items-page/unacquired-icon/${customItemSilhouetteImages[item.id]}`}
									alt="未入手のアイテム"
									width={1000}
									height={1000}
									priority={true}
									className={`${styles["unacquired-item-icon-image"]} ${
										styles[`unacquired-item-icon-image-${item.id}`]
									}`}
								/>
							</div>
						) : item.acquired ? (
							<div className={styles["acquired-item-icon"]}>
								<Image
									src="/images/plate/plate01.png"
									alt="plate"
									width={1000}
									height={1000}
									priority={true}
									className={styles["acquired-item-icon-plate"]}
								/>
								<Image
									src={`/images/items-page/acquired-icon/${item.image}`}
									alt={item.name || "アイテム"}
									width={1000}
									height={1000}
									priority={true}
									className={`${styles["acquired-item-icon-image"]} ${
										styles[`acquired-item-icon-image-${item.id}`]
									}`}
								/>
							</div>
						) : (
							<div className={styles["unacquired-item-icon"]}>
								<Image
									src="/images/plate/plate01.png"
									alt="plate"
									width={1000}
									height={1000}
									priority={true}
									className={styles["acquired-item-icon-plate"]}
								/>
								<Image
									src={`/images/items-page/unacquired-icon/${customItemSilhouetteImages[item.id]}`}
									alt="未入手のアイテム"
									width={1000}
									height={1000}
									className={`${styles["unacquired-item-icon-image"]} ${
										styles[`unacquired-item-icon-image-${item.id}`]
									}`}
								/>
							</div>
						)}
						<div className={styles["item-name-box"]}>
							<h2 className={styles["item-name"]}>
								{isGuestUser || !item.acquired ? "???" : item.name}
							</h2>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
};

export default ItemCardListClient;
