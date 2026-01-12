import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UserInfo } from "../types";
import { fetchUserInfo } from "../api";

interface UseUserInfoProps {
	wasLoggedOut: boolean;
	isNewSession: boolean;
	setWasLoggedOut: (value: boolean) => void;
	setIsNewSession: (value: boolean) => void;
	setZennUsername: (value: string) => void;
	initialZennUsername?: string | null;
}

export const useUserInfo = ({
	wasLoggedOut,
	isNewSession,
	setWasLoggedOut,
	setIsNewSession,
	setZennUsername,
	initialZennUsername,
}: UseUserInfoProps) => {
	const { user, isLoaded } = useUser();
	// サーバーサイドで取得した初期値がある場合、初期状態として使用
	const hasInitialData = initialZennUsername !== undefined && initialZennUsername !== null;
	const [userInfo, setUserInfo] = useState<UserInfo | null>(
		hasInitialData ? { zennUsername: initialZennUsername } as UserInfo : null
	);
	const [isZennInfoLoaded, setIsZennInfoLoaded] = useState(hasInitialData);
	const [hasLoadedOnce, setHasLoadedOnce] = useState(hasInitialData);

	useEffect(() => {
		const fetchAndSetUserInfo = async () => {
			if (!isLoaded) return;

			if (!hasLoadedOnce) setIsZennInfoLoaded(false);

			// ユーザーがログインしていない場合、状態をリセット
			if (!user) {
				setUserInfo(null);
				setZennUsername("");
				setIsZennInfoLoaded(true);
				setHasLoadedOnce(true);
				return;
			}

			try {
				// ログアウト/新セッションフラグをチェック
				if (wasLoggedOut || isNewSession) {
					// フラグをすぐにリセット
					setWasLoggedOut(false);
					setIsNewSession(false);

					// DBのデータは保持するため、リセット処理は行わない
					// 通常のユーザー情報取得処理に進む
				}

				// 通常のユーザー情報取得
				try {
					const data = await fetchUserInfo();

					if (data.success) {
						if (data.isNewUser) {
							setUserInfo(null);
							setZennUsername("");
							setIsZennInfoLoaded(true);
							setHasLoadedOnce(true);
							return;
						}

						setUserInfo(data.user!);
						if (data.user?.zennUsername) {
							setZennUsername(data.user.zennUsername);
						}
						setIsZennInfoLoaded(true);
						setHasLoadedOnce(true);
					} else {
						setUserInfo(null);
						setZennUsername("");
						setIsZennInfoLoaded(true);
						setHasLoadedOnce(true);
					}
				} catch (err) {
					if (err instanceof Error && err.name !== "AbortError") {
						// ネットワークエラーは記録のみ
					}
				}
			} catch (err) {
				console.error("ユーザープロフィール取得エラー:", err);
			}

			setIsZennInfoLoaded(true);
			setHasLoadedOnce(true);
		};

		fetchAndSetUserInfo();
	}, [
		user?.id,
		wasLoggedOut,
		isNewSession,
		isLoaded,
		setWasLoggedOut,
		setIsNewSession,
		setZennUsername,
		hasLoadedOnce,
	]);

	return {
		userInfo,
		setUserInfo,
		isZennInfoLoaded,
	};
};
