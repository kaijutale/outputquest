import { getUserWithArticles } from "@/features/user/_lib/fetcher";
import { PlatformType } from "@/features/posts/types";
import * as Posts from "@/features/posts/components";
import styles from "./PostsListWithData.module.css";

/**
 * PostsListWithData (Server Component)
 *
 * Zenn記事一覧を取得して表示するServer Component
 */
const PostsListWithData = async () => {
	try {
		const { articles } = await getUserWithArticles();

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
