import { getUser } from "@/features/user/_lib/fetcher";
import ConnectionPageClient from "@/features/connection/components/connection-page-client/ConnectionPageClient";

// Server Componentでユーザー情報を取得するラッパー
const ConnectionPageContent = async () => {
	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <ConnectionPageClient initialZennUsername={initialZennUsername} />;
};

export default ConnectionPageContent;
