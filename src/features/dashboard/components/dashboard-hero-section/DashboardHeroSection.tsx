import styles from "./DashboardHeroSection.module.css";
import Image from "next/image";
import crown02Image from "@/../public/images/crown/crown02.png";
import crown01EdgeImage from "@/../public/images/crown/crown01-edge.png";
import XShareButton from "@/components/common/x-share-button/XShareButton";
import { getDashboardHeroData } from "@/features/dashboard/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import * as Dashboard from "@/features/dashboard/components";

const DashboardHeroSection = async () => {
	// Request Memoizationにより、他コンポーネントと同じフェッチを共有
	const [heroData, user] = await Promise.all([getDashboardHeroData(), getUser()]);

	// ゲストユーザーかどうかの判定
	const isGuestUser = !user || !user.zennUsername;
	const zennUsername = user?.zennUsername ? `@${user.zennUsername}` : "@aoyamadev";

	// 経験値ゲージを常に40%表示に固定
	const expProgressPercent = 40;
	const remainingArticles = 1;

	return (
		<section className={`${styles["hero-info-section"]}`}>
			<h2 className={`${styles["hero-info-title"]}`}>
				<Image
					src={crown02Image}
					alt="王冠"
					width={100}
					height={100}
					preload={true}
					className={`${styles["hero-info-title-icon"]}`}
				/>
				<span>勇者のレベル</span>
			</h2>
			<div className={`${styles["hero-info-container"]}`}>
				{/* キャラクター情報 */}
				<div className={`${styles["hero-info"]}`}>
					<div className={`${styles["hero-info-box"]}`}>
						<Dashboard.DashboardHeroIconClient heroName={heroData.name} />
						<div className={styles["hero-info-name-box"]}>
							<h3 className={`${styles["hero-info-name"]}`}>
								<Image
									src={crown01EdgeImage}
									alt="王冠"
									width={100}
									height={100}
									preload={true}
									className={`${styles["hero-info-name-icon"]}`}
								/>
								<span>
									{heroData.name}
									{`(${zennUsername})`}
								</span>
							</h3>
						</div>
					</div>
					<div className={`${styles["hero-info-level"]}`}>
						<div className={`${styles["hero-info-level-header"]}`}>
							{/* レベル表示 */}
							<div className={`${styles["hero-info-level-display-container"]}`}>
								<div className={`${styles["hero-info-level-display-box"]}`}>
									<div className={`${styles["hero-info-level-display"]}`}>
										<span className={`${styles["hero-info-level-display-text"]}`}>Lv</span>
										<span className={`${styles["hero-info-level-display-value"]}`}>
											{heroData.level}
										</span>
									</div>
								</div>
							</div>
							{/* Xへのシェアリンク */}
							<XShareButton
								level={heroData.level}
								username=""
								customShareText={`【レベルアップ！】\n\n⭐️ 勇者は レベル${heroData.level}に 上がった！\n\n`}
								className={`${styles["hero-info-share-link"]}`}
								iconWrapClassName={`${styles["hero-info-share-icon-wrap"]}`}
								iconClassName={`${styles["hero-info-share-icon"]}`}
								textClassName={`${styles["hero-info-share-link-text"]}`}
								iconWidth={11}
								iconHeight={11}
								isGuestUser={isGuestUser}
							/>
						</div>
						{/* レベルアップ情報 */}
						<div className={`${styles["hero-info-level-progress-box"]}`}>
							<div className={`${styles["hero-info-level-progress-text-box"]}`}>
								<span className={`${styles["hero-info-level-progress-text"]}`}>
									次のレベルまで：
								</span>
								<div className={`${styles["hero-info-level-progress-value-info"]}`}>
									<em className={`${styles["hero-info-level-progress-value"]}`}>
										{remainingArticles}
									</em>
									<span className={`${styles["hero-info-level-progress-unit"]}`}>記事</span>
								</div>
							</div>
							<div className={`${styles["hero-info-level-progress-gauge-container"]}`}>
								<Image
									src="/images/common/exp.svg"
									alt="EXP"
									width={35}
									height={35}
									preload={true}
									className={`${styles["hero-info-level-progress-exp-icon"]}`}
								/>
								<div className={`${styles["hero-info-level-progress-gauge-box"]}`}>
									<div
										className={`${styles["hero-info-level-progress-gauge"]}`}
										style={{
											width: `${expProgressPercent}%`,
										}}
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardHeroSection;
