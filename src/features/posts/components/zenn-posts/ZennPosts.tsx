import { Suspense } from "react";
import styles from "./ZennPosts.module.css";
import * as Posts from "@/features/posts/components";

const ZennPosts = () => {
	return (
		<div className={styles["posts-container"]}>
			<div className={`${styles["posts-header"]}`}>
				<p>Zennの記事を「これまでの学び」として振り返る場所。</p>
				<p>Zennで投稿した記事が一覧表示され、学びの記録として振り返ることができます。</p>
			</div>

			<hr className={styles["posts-container-line"]} />

			<Suspense fallback={<Posts.ZennPostsSkeleton />}>
				<Posts.PostsListWithData />
			</Suspense>
		</div>
	);
};

export default ZennPosts;
