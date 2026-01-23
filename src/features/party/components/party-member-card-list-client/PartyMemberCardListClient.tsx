"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./PartyMemberCardListClient.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import { PartyMember } from "@/features/party/types/party.types";
import { customMemberSilhouetteImages } from "@/features/party/data/partyMemberData";
import PartyListSkeleton from "../party-list-skeleton/PartyListSkeleton";

interface PartyMemberCardListClientProps {
	members: PartyMember[];
	isGuestUser: boolean;
}

const PartyMemberCardListClient: React.FC<PartyMemberCardListClientProps> = ({
	members,
	isGuestUser,
}) => {
	const router = useRouter();
	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190,
	});
	const [isLoading, setIsLoading] = useState(true);

	// マウント後、最小表示時間を経てスケルトンをフェードアウト
	// Suspenseのfallbackからの滑らかな切り替えを実現するため
	useEffect(() => {
		const MINIMUM_SKELETON_DISPLAY_MS = 300;
		const timerId = setTimeout(() => {
			setIsLoading(false);
		}, MINIMUM_SKELETON_DISPLAY_MS);
		return () => clearTimeout(timerId);
	}, []);

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	return (
		<div className={styles["party-grid-wrapper"]}>
			{/* 実コンテンツ - 常にマウント（loading="eager"が効く） */}
			<div className={styles["party-grid"]}>
			{members.map((partyMember, index) => (
				<div className={styles["party-member-card-content"]} key={partyMember.id}>
					<Link
						href={`/party/${partyMember.id}`}
						className={styles["party-member-card"]}
						onClick={(e) => handleNavigation(e, `/party/${partyMember.id}`)}
					>
						{!isGuestUser && partyMember.acquired ? (
							<div className={styles["acquired-party-member-icon"]}>
								<Image
									src="/images/plate/plate01.png"
									alt="plate"
									width={310}
									height={310}
									loading={index < 4 ? "eager" : "lazy"}
									fetchPriority={index < 4 ? "high" : "auto"}
									className={styles["acquired-party-member-icon-plate"]}
								/>
								<Image
									src={`/images/party-page/acquired-icon/${partyMember.imagePath}`}
									alt={partyMember.name || "勇者の仲間"}
									width={310}
									height={310}
									loading={index < 4 ? "eager" : "lazy"}
									fetchPriority={index < 4 ? "high" : "auto"}
									className={`${styles["acquired-party-member-icon-image"]} ${
										styles[`acquired-party-member-icon-image-${partyMember.id}`]
									}`}
								/>
							</div>
						) : (
							<div className={styles["unacquired-party-member-icon"]}>
								<Image
									src="/images/plate/plate01.png"
									alt="plate"
									width={310}
									height={310}
									loading={index < 4 ? "eager" : "lazy"}
									fetchPriority={index < 4 ? "high" : "auto"}
									className={styles["acquired-party-member-icon-plate"]}
								/>
								<Image
									src={`/images/party-page/unacquired-icon/${customMemberSilhouetteImages[partyMember.id]}`}
									alt="まだ見ぬ仲間"
									width={310}
									height={310}
									loading={index < 4 ? "eager" : "lazy"}
									fetchPriority={index < 4 ? "high" : "auto"}
									className={`${styles["unacquired-party-member-icon-image"]} ${
										styles[`unacquired-party-member-icon-image-${partyMember.id}`]
									}`}
								/>
							</div>
						)}
						<div className={styles["party-member-name-box"]}>
							<h2 className={styles["party-member-name"]}>
								{isGuestUser || !partyMember.acquired ? "???" : partyMember.name}
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
				<PartyListSkeleton />
			</div>
		</div>
	);
};

export default PartyMemberCardListClient;
