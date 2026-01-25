import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import styles from "./StrengthTitleInfo.module.css";
import * as Strength from "@/features/strength/components";

/**
 * StrengthTitleInfo (Server Component)
 *
 * 称号情報を取得してStrengthTitleInfoClientに渡す
 * StrengthHeroInfoと同じパターンで2層分離
 *
 * データフェッチ:
 * - getUser(): ユーザー認証とDB取得（Request Memoization + use cache）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 */
const StrengthTitleInfo = async () => {
	try {
		// ユーザー情報を取得（Request Memoization + use cache）
		const user = await getUser();

		// ゲストユーザーの判定
		const zennUsername = user?.zennUsername || "aoyamadev";
		const isGuestUser = !user?.zennUsername;
		const articles = await getZennArticles(zennUsername, { fetchAll: true });
		const heroLevel = Math.max(articles.length, 1); // 最低レベル1

		// Client Componentにデータを渡す
		return <Strength.StrengthTitleInfoClient heroLevel={heroLevel} isGuestUser={isGuestUser} />;
	} catch (error) {
		console.error("称号情報の取得エラー:", error);
		return (
			<div className={styles["strength-title-info"]}>
				<div className={styles["strength-title-info-content"]}>
					<div className={styles["strength-title-box"]}>
						<h2 className={styles["strength-title-title"]}>称号</h2>
						<div className={styles["error-text"]}>データの取得中にエラーが発生しました。</div>
					</div>
				</div>
			</div>
		);
	}
};

export default StrengthTitleInfo;
