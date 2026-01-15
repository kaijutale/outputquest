"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../party-member-detail-content/PartyMemberDetailContent.module.css";
import PartyMemberDetailSkeleton from "../party-member-detail-skeleton/PartyMemberDetailSkeleton";

interface PartyMemberDetailCardClientProps {
	partyId: number;
	isAcquired: boolean;
	isGuestUser: boolean;
	memberName: string | null;
	memberDescription: string | null;
	requiredLevel: number;
	levelDifference: number;
	acquiredImagePath: string;
	unacquiredImagePath: string;
}

const PartyMemberDetailCardClient: React.FC<PartyMemberDetailCardClientProps> = ({
	partyId,
	isAcquired,
	isGuestUser,
	memberName,
	memberDescription,
	requiredLevel,
	levelDifference,
	acquiredImagePath,
	unacquiredImagePath,
}) => {
	// スケルトンオーバーレイのフェードアウト用
	const [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		// props が変わるたびにスケルトンを表示してフェードアウト
		setShowSkeleton(true);
		const timer = requestAnimationFrame(() => {
			setShowSkeleton(false);
		});
		return () => cancelAnimationFrame(timer);
	}, [partyId, isAcquired, isGuestUser]);

	return (
		<div className={styles["party-member-content"]}>
			<div className={styles["party-member-card-wrapper"]}>
				{/* 実コンテンツ */}
				<div className={styles["party-member-card"]}>
					<Image
						src="/images/card/card-bg.png"
						alt="card background"
						width={1000}
						height={1000}
						className={styles["party-member-card-bg"]}
						priority={true}
					/>
					<div className={styles["party-member-card-content"]}>
						<div className={styles["party-member-image-box"]}>
							{isAcquired ? (
								<Image
									src={acquiredImagePath}
									alt={memberName || "勇者の仲間"}
									width={1000}
									height={1000}
									priority={true}
									className={`${styles["party-member-image"]} ${
										styles[`party-member-image-${partyId}`]
									}`}
								/>
							) : (
								<Image
									src={unacquiredImagePath}
									alt="まだ見ぬ仲間"
									width={60}
									height={60}
									priority={true}
									className={`${styles["party-member-image"]} ${
										styles[`party-member-image-${partyId}`]
									}`}
								/>
							)}
						</div>

						<div className={styles["party-member-title-box"]}>
							<h2 className={styles["party-member-title"]}>
								{isAcquired ? memberName : "まだ見ぬ仲間"}
							</h2>
						</div>

						{isAcquired ? (
							<div className={styles["party-member-description-box"]}>
								<p className={styles["party-member-description"]}>{memberDescription}</p>
							</div>
						) : (
							<div className={styles["party-member-locked-message-box"]}>
								{isGuestUser ? (
									<p className={styles["party-member-locked-message-text"]}>
										ログインすると勇者の仲間に加わったキャラクターの詳細情報がここに表示されます。
									</p>
								) : (
									<p className={styles["party-member-locked-message-text"]}>
										<span>このキャラはLv{requiredLevel}で仲間に加わるぞ！</span>
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
					<PartyMemberDetailSkeleton />
				</div>
			</div>
		</div>
	);
};

export default PartyMemberDetailCardClient;
