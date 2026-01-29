"use client";

import Link from "next/link";
import styles from "./PartyMemberCardListClient.module.css";
import Image from "next/image";
import plate01Image from "@/../public/images/plate/plate01.png";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import { PartyMember } from "@/features/party/types/party.types";
import { customMemberSilhouetteImages } from "@/features/party/data/partyMemberData";
import PartyListSkeleton from "@/features/party/components/party-list-skeleton/PartyListSkeleton";
import { useListSkeletonWithTimeout } from "@/hooks/useSkeletonWithTimeout";

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
	const { isLoading, onImageLoad } = useListSkeletonWithTimeout(members.length);

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	return (
		<div className={styles["party-grid-wrapper"]}>
			{/* 実コンテンツ - 常にマウント（loading/fetchPriorityでファーストビュー画像を優先読み込み） */}
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
										src={plate01Image}
										alt="plate"
										width={550}
										height={550}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										className={styles["acquired-party-member-icon-plate"]}
									/>
									<Image
										src={`/images/party-page/acquired-icon/${partyMember.imagePath}`}
										alt={partyMember.name || "勇者の仲間"}
										width={200}
										height={200}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										onLoad={() => onImageLoad(index)}
										className={`${styles["acquired-party-member-icon-image"]} ${
											styles[`acquired-party-member-icon-image-${partyMember.id}`]
										}`}
									/>
								</div>
							) : (
								<div className={styles["unacquired-party-member-icon"]}>
									<Image
										src={plate01Image}
										alt="plate"
										width={550}
										height={550}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										className={styles["acquired-party-member-icon-plate"]}
									/>
									<Image
										src={`/images/party-page/unacquired-icon/${customMemberSilhouetteImages[partyMember.id]}`}
										alt="まだ見ぬ仲間"
										width={200}
										height={200}
										loading={index < 8 ? "eager" : "lazy"}
										fetchPriority={index < 4 ? "high" : "auto"}
										onLoad={() => onImageLoad(index)}
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
