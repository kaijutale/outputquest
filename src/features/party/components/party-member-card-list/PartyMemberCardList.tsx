import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import { updatePartyMembersByLevel } from "@/features/party/data/partyMemberData";
import * as Party from "@/features/party/components";
import styles from "./PartyMemberCardList.module.css";

/**
 * PartyMemberCardList (Server Component)
 *
 * パーティメンバー一覧を取得して表示するServer Component
 *
 * データフェッチ:
 * - getUser(): ユーザー認証とDB取得（Request Memoization + use cache）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 */
const PartyMemberCardList = async () => {
	try {
		// ユーザー情報を取得（Request Memoization + use cache）
		const user = await getUser();

		// ゲストユーザーの判定
		const zennUsername = user?.zennUsername || "aoyamadev";
		const isGuestUser = !user?.zennUsername;

		// Zenn記事を取得（use cache + Request Memoization）
		const articles = await getZennArticles(zennUsername, { fetchAll: true });
		const articleCount = articles.length;

		// パーティメンバーデータを更新
		const members = updatePartyMembersByLevel(articleCount);

		// Client Componentにデータを渡す
		return <Party.PartyMemberCardListClient members={members} isGuestUser={isGuestUser} />;
	} catch (error) {
		console.error("仲間データ取得エラー:", error);
		return <p className={styles["error-message"]}>仲間データの取得に失敗しました。</p>;
	}
};

export default PartyMemberCardList;
