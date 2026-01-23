import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getUser } from "@/features/user/_lib/fetcher";
import { getAdventureLogs, syncAdventureLogs } from "@/features/logs/services/logService";
import LogsList from "./LogsList";

/**
 * LogsListWrapper (Server Component)
 *
 * 冒険ログを同期・取得してLogsListに渡す
 *
 * データフェッチ:
 * - getUser(): ユーザー認証とDB取得（Request Memoization + use cache）
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 * - syncAdventureLogs(): ログ同期
 * - getAdventureLogs(): DBからログ取得
 */
const LogsListWrapper = async () => {
	// ユーザー情報を取得（Request Memoization + use cache）
	const user = await getUser();

	// 未ログインまたはZenn未連携の場合は空のログを表示
	if (!user?.zennUsername) {
		return <LogsList logs={[]} />;
	}

	// Zenn記事を取得してログを同期
	const articles = await getZennArticles(user.zennUsername, { fetchAll: true });
	await syncAdventureLogs(user.id, articles);

	// 同期後のログを取得して表示
	const logs = await getAdventureLogs(user.clerkId);

	return <LogsList logs={logs} />;
};

export default LogsListWrapper;
