"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./PostCard.module.css";
import { PlatformType } from "@/features/posts/types";
import { useClickSound } from "@/hooks/useClickSound";
import { formatDateShort } from "@/utils/formatDate";
import { PLATFORM_INFO, CATEGORY_DISPLAY } from "@/consts/zenn";

type PostCardProps = {
	title: string;
	url: string;
	category?: string;
	publishedAt?: string;
	platformType?: PlatformType;
};

const PostCard = ({ title, url, category, publishedAt, platformType }: PostCardProps) => {
	const platformInfo = platformType ? PLATFORM_INFO[platformType] : null;

	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
	});

	return (
		<article
			className={`${styles["post-card"]} ${
				platformType ? styles[`post-card-${platformType}`] : ""
			}`}
		>
			<Link
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				onClick={() => playClickSound()}
				className={`${styles["post-card__link"]}`}
			>
				<h2 className={`${styles["post-card__title"]}`}>{title}</h2>

				<hr />

				{/* 新しいコンテンツ表示エリア */}
				<div className={`${styles["post-card__info"]}`}>
					{/* カテゴリー表示 */}
					{category && (
						<div className={styles["post-card__category-box"]}>
							<span className={`${styles["post-card__category"]}`}>
								{CATEGORY_DISPLAY[category as keyof typeof CATEGORY_DISPLAY] || category}
							</span>
						</div>
					)}

					{/* 投稿日表示 */}
					{publishedAt && (
						<div className={`${styles["post-card__date-box"]}`}>
							<span className={`${styles["post-card__date"]}`}>{formatDateShort(publishedAt)}</span>
						</div>
					)}
				</div>

				<div className={`${styles["post-card__site-name"]}`}>
					{platformInfo && (
						<>
							<Image
								src={platformInfo.favicon}
								alt={`${platformInfo.name} favicon`}
								width={14}
								height={14}
								className={`${styles["favicon"]}`}
								priority
							/>
							<p className={`${styles["post-card__site-name-text"]}`}>{platformInfo.name}</p>
						</>
					)}
				</div>
			</Link>
		</article>
	);
};

export default PostCard;
