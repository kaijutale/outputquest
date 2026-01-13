import { getUser } from "@/features/user/_lib/fetcher";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { PlatformType } from "@/features/posts/types";
import * as Posts from "@/features/posts/components";
import styles from "./PostsListWithData.module.css";

/**
 * PostsListWithData (Server Component)
 *
 * Zenn記事一覧を取得して表示するServer Component
 *
 * データフェッチ:
 * - getUser(): 認証 + ユーザー情報取得（Request Memoization + use cache）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 */
const PostsListWithData = async () => {
	try {
		// ユーザー情報を取得（getUser内でconnection() + auth() + prisma呼び出し）
		const user = await getUser();

		// zennUsernameを取得（未設定の場合はデフォルト値）
		const zennUsername = user?.zennUsername || "aoyamadev";

		// Zenn記事を取得（全件取得）
		const articles = await getZennArticles(zennUsername, { fetchAll: true });

		// platformType: "zenn" を各記事に設定
		const postsData = articles.map((article) => ({
			...article,
			platformType: "zenn" as PlatformType,
		}));

		return <Posts.PostsList postsData={postsData} />;
	} catch (error) {
		console.error("Zenn記事の取得エラー:", error);
		return (
			<div className={styles["error-message"]}>
				Zennの記事データの取得中にエラーが発生しました。
			</div>
		);
	}
};

export default PostsListWithData;
