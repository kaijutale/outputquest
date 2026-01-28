"use client";

import { useState, useCallback, useTransition, useOptimistic } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import styles from "./ConnectionPageClient.module.css";
import * as Connection from "@/features/connection/components";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import { useHero } from "@/contexts/HeroContext";
import {
	useSessionManagement,
	useMessageStorage,
	useUserInfo,
	useSignOutHandler,
} from "@/features/connection/hooks";
import {
	syncZennArticles as syncZennArticlesAction,
	releaseZennConnection as releaseZennConnectionAction,
} from "@/features/connection/_actions/zennConnection";
import { UserInfo } from "@/features/connection/types";

// グローバル変数の型拡張
declare global {
	interface Window {
		__clerk_custom_signout_handler?: () => Promise<void>;
	}
}

type Props = {
	initialZennUsername: string | null;
};

// ユーザープロフィールページ
export default function ConnectionPageClient({ initialZennUsername }: Props) {
	const { user, isLoaded } = useUser();
	const router = useRouter();
	const { refetchHeroData } = useHero();

	// サーバーサイドで取得した初期値を使用
	const [zennUsername, setZennUsername] = useState(initialZennUsername ?? "");
	const [wasLoggedOut, setWasLoggedOut] = useState(false);
	const [isNewSession, setIsNewSession] = useState(false);

	// 共通のメッセージステート
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [releaseMessage, setReleaseMessage] = useState("");

	// Server Actions 用の transition
	const [isPending, startTransition] = useTransition();

	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190,
	});

	// カスタムフックを使用
	useSessionManagement({
		user,
		isLoaded,
		setWasLoggedOut,
		setIsNewSession,
		setZennUsername,
	});

	// メッセージストレージフック
	const { showSuccessMessage } = useMessageStorage({
		setSuccess,
		setReleaseMessage,
		setWasLoggedOut,
	});

	// ユーザー情報管理
	const { userInfo, setUserInfo, isZennInfoLoaded } = useUserInfo({
		wasLoggedOut,
		isNewSession,
		setWasLoggedOut,
		setIsNewSession,
		setZennUsername,
		initialZennUsername,
	});

	// サインアウト処理
	useSignOutHandler({
		userInfo,
		setZennUsername,
		setUserInfo,
	});

	// 楽観的 UI 用
	const [optimisticUser, addOptimistic] = useOptimistic<UserInfo | null, Partial<UserInfo>>(
		userInfo,
		(current, patch) => (current ? { ...current, ...patch } : current)
	);

	// 遅延付きページ遷移の処理
	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	// Zenn連携成功時のコールバック
	const handleConnectionSuccess = useCallback(
		async (newUser: UserInfo, articleCount: number, message: string) => {
			setError("");
			setSuccess("");
			setReleaseMessage("");
			setUserInfo(newUser);
			setZennUsername(newUser.zennUsername || "");
			showSuccessMessage(message);

			// HeroContext を更新
			try {
				await refetchHeroData();
			} catch (e) {
				console.error("HeroContext更新エラー:", e);
			}
		},
		[setUserInfo, showSuccessMessage, refetchHeroData]
	);

	// Zenn連携エラー時のコールバック
	const handleConnectionError = useCallback((errorMessage: string) => {
		setError(errorMessage);
		setSuccess("");
		setReleaseMessage("");
	}, []);

	// Zenn記事同期処理（Server Action を使用）
	const handleSyncZennArticles = useCallback(async () => {
		if (!userInfo?.zennUsername) return;

		setError("");
		setSuccess("");
		setReleaseMessage("");

		// 楽観的 UI 更新
		startTransition(() => {
			addOptimistic({ zennArticleCount: userInfo.zennArticleCount });
		});

		const result = await syncZennArticlesAction(userInfo.zennUsername);

		if (result.success) {
			if (result.user) {
				setUserInfo(result.user);
				setZennUsername(result.user.zennUsername || "");
			}
			showSuccessMessage(result.message || "同期完了");

			// HeroContext を更新
			try {
				await refetchHeroData();
			} catch (e) {
				console.error("HeroContext更新エラー:", e);
			}
		} else {
			setError(result.error || "同期に失敗しました");
		}
	}, [userInfo, addOptimistic, setUserInfo, showSuccessMessage, refetchHeroData]);

	// 連携解除処理（Server Action を使用）
	const handleRelease = useCallback(async () => {
		setError("");
		setSuccess("");
		setReleaseMessage("");

		const result = await releaseZennConnectionAction();

		if (result.success) {
			if (result.user) {
				setUserInfo(result.user);
			}
			setZennUsername("");
			setReleaseMessage("Zennのアカウント連携を解除しました");

			// HeroContext を更新
			try {
				await refetchHeroData();
			} catch (e) {
				console.error("HeroContext更新エラー:", e);
			}
		} else {
			setError(result.error || "連携解除に失敗しました");
		}
	}, [setUserInfo, refetchHeroData]);

	const displayUser = optimisticUser ?? userInfo;
	const loading = isPending;

	return (
		<>
			<div className={styles["title-bg"]}></div>
			<h1 className={`${styles["profile-title"]}`}>連携</h1>
			<div className={`${styles["profile-container"]}`}>
				{!isLoaded ? (
					<LoadingIndicator
						text="読み込み中"
						className={`${styles["loading-indicator"]} px-4 pb-[40px] text-center`}
					/>
				) : !user ? (
					<Connection.ConnectionAuthSection
						loading={loading}
						zennUsername={zennUsername}
						updateUserProfile={() => Promise.resolve(false)}
					/>
				) : (
					<div className={styles["profile-info-container"]}>
						<div className={styles["profile-info-header"]}>
							<Connection.ConnectionUserProfileHeader user={user} />

							<hr className={styles["center-line"]} />
						</div>

						<div className={styles["connection-info-container"]}>
							{!isZennInfoLoaded ? (
								<LoadingIndicator
									text="読み込み中"
									className={`${styles["loading-indicator"]} p-4 text-center`}
								/>
							) : displayUser?.zennUsername ? (
								<>
									<div className={styles["connection-info-zenn"]}>
										<Connection.ConnectionZennInfoDisplay
											userInfo={displayUser!}
											loading={loading}
										/>
									</div>
									<div className={styles["connection-info-button-container"]}>
										<Connection.ConnectionNavigationToAdventure onNavigate={handleNavigation} />
										<Connection.ConnectionButtonGroup
											loading={loading}
											userInfo={displayUser!}
											onSync={handleSyncZennArticles}
											onRelease={handleRelease}
										/>
									</div>
								</>
							) : (
								<Connection.ConnectionZennForm
									initialUsername={zennUsername}
									onSuccess={handleConnectionSuccess}
									onError={handleConnectionError}
									playClickSound={playClickSound}
									isZennInfoLoaded={isZennInfoLoaded}
								/>
							)}
							<div className={styles["connection-info-message-container"]}>
								<Connection.ConnectionMessageDisplay
									error={error}
									success={success}
									releaseMessage={releaseMessage}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
