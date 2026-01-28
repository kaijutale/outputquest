import { Suspense } from "react";
import { getHeroInitialData } from "@/features/user/_lib/fetcher";
import { HeroProvider } from "@/contexts/HeroContext";

interface HeroProviderWrapperProps {
	children: React.ReactNode;
}

/**
 * 非同期データ取得を行う内部コンポーネント
 */
async function HeroDataFetcher({
	children,
}: {
	children: React.ReactNode;
}): Promise<React.ReactElement> {
	const initialData = await getHeroInitialData();

	return <HeroProvider initialData={initialData}>{children}</HeroProvider>;
}

/**
 * HeroProvider用のServer Componentラッパー
 *
 * サーバーサイドで初期Hero データを取得し、HeroProviderに渡す。
 * Suspenseで囲むことで、プリレンダリング中のエラーを回避する。
 */
const HeroProviderWrapper = ({ children }: HeroProviderWrapperProps) => {
	return (
		<Suspense fallback={<HeroProvider>{children}</HeroProvider>}>
			<HeroDataFetcher>{children}</HeroDataFetcher>
		</Suspense>
	);
};

export default HeroProviderWrapper;
