"use client";

import Image from "next/image";
import styles from "./PartyMemberDetailCardClient.module.css";
import * as PartyMember from "@/features/party-member/components";
import { useSkeletonWithTimeout } from "@/hooks/useSkeletonWithTimeout";

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
	const { showSkeleton, onImageLoad } = useSkeletonWithTimeout([partyId, isAcquired, isGuestUser]);

	return (
		<div className={styles["party-member-content"]}>
			<div className={styles["party-member-card-wrapper"]}>
				{/* 実コンテンツ */}
				<div className={styles["party-member-card"]}>
					<Image
						src="/images/card/card-bg.png"
						alt="card background"
						width={400}
						height={400}
						className={styles["party-member-card-bg"]}
						preload={true}
					/>
					<div className={styles["party-member-card-content"]}>
						<div className={styles["party-member-image-box"]}>
							{isAcquired ? (
								<Image
									src={acquiredImagePath}
									alt={memberName || "勇者の仲間"}
									width={200}
									height={200}
									preload={true}
									onLoad={onImageLoad}
									className={`${styles["party-member-image"]} ${
										styles[`party-member-image-${partyId}`]
									}`}
								/>
							) : (
								<Image
									src={unacquiredImagePath}
									alt="まだ見ぬ仲間"
									width={200}
									height={200}
									preload={true}
									onLoad={onImageLoad}
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
					<PartyMember.PartyMemberDetailSkeleton />
				</div>
			</div>
		</div>
	);
};

export default PartyMemberDetailCardClient;
