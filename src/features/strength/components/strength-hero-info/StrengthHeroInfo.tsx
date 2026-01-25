import { getUserWithArticles } from "@/features/user/_lib/fetcher";
import { strengthHeroData } from "@/features/strength/data/strengthHeroData";
import * as Strength from "@/features/strength/components";
import styles from "./StrengthHeroInfo.module.css";

/**
 * StrengthHeroInfo (Server Component)
 *
 * 勇者のレベル情報を取得してStrengthHeroInfoClientに渡す
 */
const StrengthHeroInfo = async () => {
	try {
		const { zennUsername, articleCount } = await getUserWithArticles();

		// レベル計算（1投稿 = 1レベル）
		const calculatedLevel = Math.max(articleCount, 1); // 最低レベル1

		const heroData = {
			...strengthHeroData,
			level: calculatedLevel,
			currentExp: 40,
			nextLevelExp: 100,
			remainingArticles: 1,
		};

		return (
			<Strength.StrengthHeroInfoClient heroData={heroData} zennUsername={`@${zennUsername}`} />
		);
	} catch (error) {
		console.error("Zenn記事の取得エラー:", error);
		return (
			<div className={styles["strength-hero-info"]}>
				<div className={styles["strength-hero-info-content"]}>
					<h2 className={styles["strength-hero-info-title"]}>勇者のレベル</h2>
					<div className={styles["error-text"]}>データの取得中にエラーが発生しました。</div>
				</div>
			</div>
		);
	}
};

export default StrengthHeroInfo;
