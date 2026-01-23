import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import { strengthHeroData } from "@/features/strength/data/strengthHeroData";
import * as Strength from "@/features/strength/components";
import styles from "./StrengthHeroInfo.module.css";

/**
 * StrengthHeroInfo (Server Component)
 *
 * 勇者のレベル情報を取得してStrengthHeroInfoClientに渡す
 * ItemCardList/PartyMemberCardListと同じパターンで2層分離
 *
 * データフェッチ:
 * - getUser(): ユーザー認証とDB取得（Request Memoization + use cache）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 */
const StrengthHeroInfo = async () => {
	try {
		// ユーザー情報を取得（Request Memoization + use cache）
		const user = await getUser();

		// ゲストユーザーの判定
		const zennUsername = user?.zennUsername || "aoyamadev";

		// Zenn記事数を取得（全件取得）
		const articles = await getZennArticles(zennUsername, { fetchAll: true });
		const articlesCount = articles.length;

		// レベル計算（1投稿 = 1レベル）
		const calculatedLevel = Math.max(articlesCount, 1); // 最低レベル1
		const currentExp = 40;
		const nextLevelExp = 100;
		const remainingArticles = 1;

		const heroData = {
			...strengthHeroData,
			level: calculatedLevel,
			currentExp,
			nextLevelExp,
			remainingArticles,
		};

		// zennUsernameの表示形式
		const displayZennUsername = `@${zennUsername}`;

		// Client Componentにデータを渡す
		return (
			<Strength.StrengthHeroInfoClient heroData={heroData} zennUsername={displayZennUsername} />
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
