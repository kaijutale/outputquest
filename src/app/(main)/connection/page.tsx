import { Suspense } from "react";
import * as Connection from "@/features/connection/components";
import { getPageMetadata } from "@/config/metadata";
import { Metadata } from "next";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import { getUser } from "@/features/user/_lib/fetcher";

export const metadata: Metadata = getPageMetadata("connection");

// Server Componentでユーザー情報を取得するラッパー
const ConnectionPageContent = async () => {
	const user = await getUser();
	const initialZennUsername = user?.zennUsername ?? null;

	return <Connection.ConnectionPageClient initialZennUsername={initialZennUsername} />;
};

export default function ConnectionPage() {
	return (
		<Suspense
			fallback={
				<div className="grid place-items-center pt-4">
					<LoadingIndicator text="読み込み中" />
				</div>
			}
		>
			<ConnectionPageContent />
		</Suspense>
	);
}
