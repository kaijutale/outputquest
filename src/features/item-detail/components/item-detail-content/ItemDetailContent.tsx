"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import styles from "./ItemDetailContent.module.css";
import * as ItemDetail from "@/features/item-detail/components";
import {
	isAcquiredByHeroLevel,
	heroLevelAndItemRelation,
	customItemNames,
	customItemDescriptions,
	customItemImages,
	customItemSilhouetteImages,
} from "@/features/items/data/itemsData";
import { fetchZennArticles } from "@/features/posts/services";

interface ItemDetailProps {
	itemId: number;
}

const ItemDetailContent: React.FC<ItemDetailProps> = ({ itemId }) => {
	const { user, isLoaded } = useUser();
	// Zenn連携アカウントのレベル取得状態
	const [currentLevel, setCurrentLevel] = useState<number>(1);
	const [levelError, setLevelError] = useState<string | null>(null);
	const [userZennInfo, setUserZennInfo] = useState<{
		zennUsername?: string;
	} | null>(null);
	const [isZennInfoLoaded, setIsZennInfoLoaded] = useState(false);

	// ゲストユーザーの判定
	const isGuestUser = !isLoaded || !user || !userZennInfo?.zennUsername;

	useEffect(() => {
		const loadLevel = async () => {
			try {
				if (!isLoaded) {
					setIsZennInfoLoaded(false);
					return;
				}

				if (!user) {
					setUserZennInfo(null);
					setIsZennInfoLoaded(true);
					setCurrentLevel(1);
					return;
				}

				setIsZennInfoLoaded(false);

				const userRes = await fetch("/api/user");
				const userData = await userRes.json();

				if (!userData.success) {
					throw new Error("ユーザー情報の取得に失敗しました");
				}

				setUserZennInfo(userData.user);

				const username = userData.user.zennUsername;
				if (!username) {
					setCurrentLevel(1);
					return;
				}

				const articles = await fetchZennArticles(username, { fetchAll: true });
				setCurrentLevel(articles.length);
			} catch (err) {
				console.error("レベル取得エラー:", err);
				setLevelError(err instanceof Error ? err.message : "レベル取得中にエラーが発生しました。");
			} finally {
				setIsZennInfoLoaded(true);
			}
		};
		loadLevel();
	}, [isLoaded, user?.id]);

	// ロード中の表示
	const isLoading = !isLoaded || (user && !isZennInfoLoaded);

	if (levelError) {
		return <p className={styles["error-text"]}>{levelError}</p>;
	}

	// ゲストユーザーの場合は常に未入手状態として表示
	const isAcquired = !isGuestUser && isAcquiredByHeroLevel(itemId, currentLevel);

	// アイテムを入手するために必要なレベル
	const requiredLevel = heroLevelAndItemRelation[itemId] || itemId;

	// レベル差を計算（マイナスにならないようにする）
	const levelDifference = Math.max(0, requiredLevel - currentLevel);

	// アイテムの名前と説明文を取得
	const itemName = isAcquired ? customItemNames[itemId] || `アイテム${itemId}` : null;
	const itemDescription = isAcquired
		? customItemDescriptions[itemId] || `このアイテムの説明はありません。`
		: null;

	return (
		<div className={styles["item-detail-content"]}>
			<div className={styles["item-detail-card-wrapper"]}>
				{/* 実コンテンツ - 常にマウント（priority属性が効く） */}
				<div className={styles["item-detail-card"]}>
					<Image
						src="/images/card/card-bg.png"
						alt="card background"
						width={1000}
						height={1000}
						className={styles["item-detail-card-bg"]}
						priority={true}
					/>
					<div className={styles["item-detail-card-content"]}>
						<div className={styles["item-detail-image-box"]}>
							{isAcquired ? (
								<Image
									src={
										customItemImages[itemId]
											? `/images/items-page/acquired-icon/${customItemImages[itemId]}`
											: `/images/items-page/acquired-icon/item-${itemId}.png`
									}
									alt={itemName || "アイテム"}
									width={1000}
									height={1000}
									priority={true}
									className={`${styles["item-detail-image"]} ${
										styles[`item-detail-image-${itemId}`]
									}`}
								/>
							) : (
								<Image
									src={`/images/items-page/unacquired-icon/${customItemSilhouetteImages[itemId]}`}
									alt="未入手のアイテム"
									width={60}
									height={60}
									priority={true}
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

				{/* Skeletonオーバーレイ - ローディング時のみ表示 */}
				<div
					className={`${styles["skeleton-overlay"]} ${
						isLoading ? styles["skeleton-overlay-visible"] : styles["skeleton-overlay-hidden"]
					}`}
				>
					<ItemDetail.ItemDetailSkeleton />
				</div>
			</div>
		</div>
	);
};

export default ItemDetailContent;
