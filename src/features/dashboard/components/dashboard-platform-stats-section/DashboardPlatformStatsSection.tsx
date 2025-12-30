"use client";

import { useState, useEffect } from "react";
import styles from "./DashboardPlatformStatsSection.module.css";
import { DashboardData } from "../../types/dashboard.types";
import { useHero } from "@/contexts/HeroContext";
import { getUserInfo } from "@/lib/api/user";
import { useUser } from "@clerk/nextjs";
import XShareButton from "@/components/common/x-share-button/XShareButton";
import Image from "next/image";

type DashboardPlatformStatsSectionProps = {
	dashboardData: DashboardData;
};

const DashboardPlatformStatsSection = ({ dashboardData }: DashboardPlatformStatsSectionProps) => {
	const { heroData, isLoading, error } = useHero();
	const { user, isLoaded } = useUser();
	const [userZennInfo, setUserZennInfo] = useState<{
		zennUsername?: string;
	} | null>(null);

	// ゲストユーザーの判定
	const isGuestUser = !isLoaded || !user || !userZennInfo?.zennUsername;

	// ユーザーのZenn連携情報を取得
	useEffect(() => {
		const fetchUserZennInfo = async () => {
			if (!isLoaded) {
				return;
			}

			if (!user) {
				setUserZennInfo(null);
				return;
			}

			try {
				const userData = await getUserInfo();

				if (userData.success && userData.user) {
					setUserZennInfo(userData.user);
				} else {
					setUserZennInfo(null);
				}
			} catch (err) {
				console.error("ユーザー情報取得エラー:", err);
				setUserZennInfo(null);
			}
		};

		fetchUserZennInfo();
	}, [isLoaded, user?.id]);

	// 実際のZennデータとモックデータを組み合わせてstatsを作成
	const zennStat = {
		platform: "Zenn",
		count: isLoading ? dashboardData.postStats[0].count : heroData.level,
		color: "#3ea8ff",
	};

	return (
		<section className={`${styles["platform-stats-section"]}`}>
			<h2 className={`${styles["platform-stats-title"]}`}>
				<Image
					src="/images/crown/crown02.png"
					alt="王冠"
					width={100}
					height={100}
					className={`${styles["platform-stats-title-icon"]}`}
				/>
				<span>投稿状況</span>
			</h2>
			<div className={`${styles["platform-stats-container"]}`}>
				<div className={`${styles["platform-stats-grid"]}`}>
					<div className={`${styles["platform-stat-card"]} ${styles["platform-stat-card-zenn"]}`}>
						<div className={`${styles["platform-stat-card-content"]}`}>
							<h3 className={`${styles["platform-stat-card-title"]}`}>{zennStat.platform}</h3>
							<div className={`${styles["platform-stat-count"]}`}>
								{isLoading ? (
									<>
										<span className={styles["loading-dots"]}>
											<span className={styles["loading-dot"]}>.</span>
											<span className={styles["loading-dot"]}>.</span>
											<span className={styles["loading-dot"]}>.</span>
										</span>
										<span className={`${styles["platform-stat-unit"]}`}>記事</span>
									</>
								) : error ? (
									<>
										<span className={`${styles["platform-stat-error"]}`}>0</span>
										<span className={`${styles["platform-stat-unit"]}`}>記事</span>
									</>
								) : (
									<>
										<em className={`${styles["platform-stat-count-em"]}`}>{zennStat.count}</em>
										<span className={`${styles["platform-stat-unit"]}`}>記事</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* Xへのシェアリンク */}
				<XShareButton
					level={zennStat.count}
					username=""
					customText="Zennの投稿数をXでシェアする"
					customShareText={`【新たな記録！】\n\n⭐️ 勇者は Zennの投稿数が「${zennStat.count}本」になった！\n\n`}
					className={`${styles["platform-stat-share-link"]}`}
					iconWrapClassName={`${styles["platform-stat-share-icon-wrap"]}`}
					iconClassName={`${styles["platform-stat-share-icon"]}`}
					textClassName={`${styles["platform-stat-share-link-text"]}`}
					iconWidth={11}
					iconHeight={11}
					isGuestUser={isGuestUser}
				/>
			</div>
		</section>
	);
};

export default DashboardPlatformStatsSection;
