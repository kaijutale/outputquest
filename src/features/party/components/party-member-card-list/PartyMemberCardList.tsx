import { getUserWithArticles } from "@/features/user/_lib/fetcher";
import { updatePartyMembersByLevel } from "@/features/party/data/partyMemberData";
import * as Party from "@/features/party/components";
import styles from "./PartyMemberCardList.module.css";

/**
 * PartyMemberCardList (Server Component)
 *
 * パーティメンバー一覧を取得して表示するServer Component
 */
const PartyMemberCardList = async () => {
	try {
		const { articleCount, isGuestUser } = await getUserWithArticles();
		const members = updatePartyMembersByLevel(articleCount);
		return <Party.PartyMemberCardListClient members={members} isGuestUser={isGuestUser} />;
	} catch (error) {
		console.error("仲間データ取得エラー:", error);
		return <p className={styles["error-message"]}>仲間データの取得に失敗しました。</p>;
	}
};

export default PartyMemberCardList;
