import { connection } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import StrengthTitleInfoClient from "./StrengthTitleInfoClient";
import styles from "./StrengthTitleInfo.module.css";

/**
 * StrengthTitleInfo (Server Component)
 *
 * 称号情報を取得してStrengthTitleInfoClientに渡す
 * StrengthHeroInfoと同じパターンで2層分離
 *
 * データフェッチ:
 * - connection() + auth() + prisma: ユーザー認証とDB取得（動的）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 *
 * 注意: getUser()を使うとキャッシュの問題でユーザー間でデータが混在する
 * 可能性があるため、認証関連は直接呼び出しを維持
 */
const StrengthTitleInfo = async () => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	try {
		// 認証情報を取得
		const { userId } = await auth();

		// ゲストユーザーの判定
		let zennUsername: string | null = null;
		let isGuestUser = true;

		if (userId) {
			// 認証済みユーザーの場合、DBからzennUsernameを取得
			const user = await prisma.user.findUnique({
				where: { clerkId: userId },
				select: {
					zennUsername: true,
				},
			});

			if (user?.zennUsername) {
				zennUsername = user.zennUsername;
				isGuestUser = false;
			}
		}

		// Zenn記事数を取得（全件取得）
		// ゲストユーザーは@aoyamadevのデータを使用
		const username = zennUsername || "aoyamadev";
		const articles = await getZennArticles(username, { fetchAll: true });
		const heroLevel = Math.max(articles.length, 1); // 最低レベル1

		// Client Componentにデータを渡す
		return <StrengthTitleInfoClient heroLevel={heroLevel} isGuestUser={isGuestUser} />;
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
