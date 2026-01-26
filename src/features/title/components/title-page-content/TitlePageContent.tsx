import { getUser } from "@/features/user/_lib/fetcher";
import TitlePageClient from "@/features/title/components/title-page-client/TitlePageClient";

// Server Componentでユーザー情報を取得するラッパー
const TitlePageContent = async () => {
	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <TitlePageClient initialZennUsername={initialZennUsername} />;
};

export default TitlePageContent;
