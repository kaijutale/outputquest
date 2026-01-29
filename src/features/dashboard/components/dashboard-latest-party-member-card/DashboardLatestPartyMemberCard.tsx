"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/hooks/useClickSound";
import styles from "./DashboardLatestPartyMemberCard.module.css";
import { customMemberImages } from "@/features/party/data/partyMemberData";

type Props = {
	memberId: number;
	memberName: string;
	memberDescription: string;
};

const DashboardLatestPartyMemberCard = ({
	memberId,
	memberName,
	memberDescription,
}: Props) => {
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
		<div className={`${styles["party-member-box"]}`}>
			<Link
				href={`/party/${memberId}`}
				className={`${styles["party-member-link"]}`}
				onClick={(e) => handleNavigation(e, `/party/${memberId}`)}
			>
				<div className={`${styles["party-member-icon-box"]}`}>
					<Image
						src="/images/plate/plate01.png"
						alt="plate"
						width={1000}
						height={1000}
						preload={true}
						className={styles["party-member-icon-plate"]}
					/>
					<Image
						src={
							customMemberImages[memberId]
								? `/images/party-page/acquired-icon/${customMemberImages[memberId]}`
								: "/images/party-page/unacquired-icon/mark_question.svg"
						}
						alt={memberName}
						width={1000}
						height={1000}
						className={`${styles["party-member-icon"]} ${styles[`party-member-icon-${memberId}`]}`}
					/>
				</div>
				<div className={`${styles["party-member-info"]}`}>
					<div className={`${styles["party-member-name-box"]}`}>
						<h3 className={`${styles["party-member-name"]}`}>{memberName}</h3>
					</div>
					<p className={`${styles["party-member-description"]}`}>{memberDescription}</p>
				</div>
			</Link>
		</div>
	);
};

export default DashboardLatestPartyMemberCard;
