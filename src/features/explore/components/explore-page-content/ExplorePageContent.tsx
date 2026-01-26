import { getUser } from "@/features/user/_lib/fetcher";
import ExplorePageClient from "../explore-page-client/ExplorePageClient";

// Server Componentでユーザー情報を取得するラッパー
const ExplorePageContent = async () => {
	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <ExplorePageClient initialZennUsername={initialZennUsername} />;
};

export default ExplorePageContent;
