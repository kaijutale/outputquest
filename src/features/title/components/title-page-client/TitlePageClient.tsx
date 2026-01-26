"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import styles from "./TitlePageClient.module.css";
import * as Title from "@/features/title/components";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";

type Props = {
	initialZennUsername: string | null;
};

const TitlePageClient = ({ initialZennUsername }: Props) => {
	const { user, isLoaded } = useUser();
	// サーバーサイドで取得した初期値を使用（useEffectでのフェッチ不要）
	const [userZennInfo] = useState<{ zennUsername?: string } | null>(
		initialZennUsername ? { zennUsername: initialZennUsername } : null
	);

	// ロード中の判定（サーバーサイドで取得済みのため、Clerk認証状態のみ確認）
	const isLoading = !isLoaded;

	// ゲストユーザーかどうかの判定（Clerkサインイン + Zenn連携の両方が必要）
	const isGuestUser = !user || !userZennInfo?.zennUsername;

	// ロード中の場合は読み込み中UIを表示
	if (isLoading) {
		return (
			<div className={`${styles["title-page-container"]}`}>
				<div className="text-sm sm:text-base grid place-items-center h-full bg-[#1a1a1a] px-[10px] py-[40px]">
					<LoadingIndicator text="読み込み中" className={styles["loading-indicator"]} />
				</div>
			</div>
		);
	}

	return (
		<>
			{isGuestUser ? (
				// ゲストユーザー用のUI
				<div className={`${styles["title-page-guest-container"]}`}>
					<p className="text-sm sm:text-base grid place-items-center h-full bg-[#1a1a1a] px-[10px] py-[40px]">
						ゲストユーザーのため獲得した称号はありません
					</p>
					<Title.TitlePageFooter />
				</div>
			) : (
				// ログインユーザー用のUI
				<div className={`${styles["title-page-container"]}`}>
					<Title.TitlePageHeader />

					<hr className={styles["title-page-line-first"]} />

					{/* クライアントコンポーネントで称号リストを表示 */}
					<Title.TitleList />

					<hr className={styles["title-page-line-second"]} />

					<Title.TitlePageFooter />
				</div>
			)}
		</>
	);
};

export default TitlePageClient;
