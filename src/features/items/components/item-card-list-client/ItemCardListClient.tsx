"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ItemCardListClient.module.css";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/hooks/useClickSound";
import { Item } from "@/features/items/types/items.types";
import { customItemSilhouetteImages } from "@/features/items/data/itemsData";
import ItemListSkeleton from "@/features/items/components/item-list-skeleton/ItemListSkeleton";
import { useListSkeletonWithTimeout } from "@/hooks/useSkeletonWithTimeout";

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
	const { isLoading, onImageLoad } = useListSkeletonWithTimeout(items.length);

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	return (
		<div className={styles["items-grid-wrapper"]}>
			{/* 実コンテンツ - 常にマウント（loading/fetchPriorityでファーストビュー画像を優先読み込み） */}
			<div className={styles["items-grid"]}>
				{items.map((item, index) => (
					<div className={styles["item-card-content"]} key={item.id}>
						<Link
							href={`/items/${item.id}`}
							className={styles["item-card"]}
							onClick={(e) => handleNavigation(e, `/items/${item.id}`)}
						>
							{!isGuestUser && item.acquired ? (
								<div className={styles["acquired-item-icon"]}>
									<Image
										src="/images/plate/plate01.png"
										alt="plate"
										width={550}
										height={550}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										className={styles["acquired-item-icon-plate"]}
									/>
									<Image
										src={`/images/items-page/acquired-icon/${item.image}`}
										alt={item.name || "アイテム"}
										width={300}
										height={300}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										onLoad={() => onImageLoad(index)}
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
										width={550}
										height={550}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										className={styles["acquired-item-icon-plate"]}
									/>
									<Image
										src={`/images/items-page/unacquired-icon/${customItemSilhouetteImages[item.id]}`}
										alt="未入手のアイテム"
										width={300}
										height={300}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										onLoad={() => onImageLoad(index)}
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

			{/* Skeletonオーバーレイ - ローディング時のみ表示 */}
			<div
				className={`${styles["skeleton-overlay"]} ${
					isLoading ? styles["skeleton-overlay-visible"] : styles["skeleton-overlay-hidden"]
				}`}
			>
				<ItemListSkeleton />
			</div>
		</div>
	);
};

export default ItemCardListClient;
