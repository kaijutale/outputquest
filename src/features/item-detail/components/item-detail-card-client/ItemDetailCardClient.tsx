"use client";

import Image from "next/image";
import styles from "./ItemDetailCardClient.module.css";
import * as ItemDetail from "@/features/item-detail/components";
import { useSkeletonWithTimeout } from "@/hooks/useSkeletonWithTimeout";

interface ItemDetailCardClientProps {
	itemId: number;
	isAcquired: boolean;
	isGuestUser: boolean;
	itemName: string | null;
	itemDescription: string | null;
	requiredLevel: number;
	levelDifference: number;
	acquiredImagePath: string;
	unacquiredImagePath: string;
}

const ItemDetailCardClient: React.FC<ItemDetailCardClientProps> = ({
	itemId,
	isAcquired,
	isGuestUser,
	itemName,
	itemDescription,
	requiredLevel,
	levelDifference,
	acquiredImagePath,
	unacquiredImagePath,
}) => {
	const { showSkeleton, onImageLoad } = useSkeletonWithTimeout([itemId, isAcquired, isGuestUser]);

	return (
		<div className={styles["item-detail-content"]}>
			<div className={styles["item-detail-card-wrapper"]}>
				{/* 実コンテンツ */}
				<div className={styles["item-detail-card"]}>
					<Image
						src="/images/card/card-bg.png"
						alt="card background"
						width={400}
						height={400}
						className={styles["item-detail-card-bg"]}
						preload={true}
					/>
					<div className={styles["item-detail-card-content"]}>
						<div className={styles["item-detail-image-box"]}>
							{isAcquired ? (
								<Image
									src={acquiredImagePath}
									alt={itemName || "アイテム"}
									width={200}
									height={200}
									preload={true}
									onLoad={onImageLoad}
									className={`${styles["item-detail-image"]} ${
										styles[`item-detail-image-${itemId}`]
									}`}
								/>
							) : (
								<Image
									src={unacquiredImagePath}
									alt="未入手のアイテム"
									width={200}
									height={200}
									preload={true}
									onLoad={onImageLoad}
									className={`${styles["item-detail-image"]} ${
										styles[`item-detail-image-${itemId}`]
									}`}
								/>
							)}
						</div>

						<div className={styles["item-detail-title-box"]}>
							<h2 className={styles["item-detail-title"]}>
								{isAcquired ? itemName : "未入手のアイテム"}
							</h2>
						</div>

						{isAcquired ? (
							<div className={styles["item-detail-description-box"]}>
								<p className={styles["item-detail-description"]}>{itemDescription}</p>
							</div>
						) : (
							<div className={styles["item-detail-locked-message-box"]}>
								{isGuestUser ? (
									<p className={styles["item-detail-locked-message-text"]}>
										ログインすると入手したアイテムについての詳細情報がここに表示されます。
									</p>
								) : (
									<p className={styles["item-detail-locked-message-text"]}>
										<span>このアイテムは、Lv{requiredLevel}で入手できるぞ！</span>
										<span>
											Lv{requiredLevel}まで、あと{levelDifference}レベル
										</span>
									</p>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Skeletonオーバーレイ - フェードアウトアニメーション */}
				<div
					className={`${styles["skeleton-overlay"]} ${
						showSkeleton ? styles["skeleton-overlay-visible"] : styles["skeleton-overlay-hidden"]
					}`}
				>
					<ItemDetail.ItemDetailSkeleton />
				</div>
			</div>
		</div>
	);
};

export default ItemDetailCardClient;
