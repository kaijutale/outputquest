import { getUserWithArticles } from "@/features/user/_lib/fetcher";
import styles from "./StrengthTitleInfo.module.css";
import * as Strength from "@/features/strength/components";

/**
 * StrengthTitleInfo (Server Component)
 *
 * 称号情報を取得してStrengthTitleInfoClientに渡す
 */
const StrengthTitleInfo = async () => {
	try {
		const { articleCount, isGuestUser } = await getUserWithArticles();
		const heroLevel = Math.max(articleCount, 1); // 最低レベル1
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
