import { getUser } from "@/features/user/_lib/fetcher";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import * as Dashboard from "@/features/dashboard/components";

const DashboardActivitySection = async () => {
	// Request Memoization: 同一リクエスト内で1回のみ実行
	const user = await getUser();

	// ユーザー名のフォールバック
	const username = user?.zennUsername || "aoyamadev";

	// Request Memoization: 同一リクエスト内で1回のみ実行
	const articles = await getZennArticles(username, { limit: 5 });

	// Client Componentにデータを渡す
	return <Dashboard.DashboardActivityContent articles={articles} />;
};

export default DashboardActivitySection;
