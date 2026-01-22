"use client";

import "client-only";

import { useEffect, Dispatch, SetStateAction } from "react";
import { UserResource } from "@clerk/types";
import { SESSION_ID_KEY, LOGOUT_FLAG_KEY } from "@/features/connection/constants";

interface UseSessionManagementProps {
	user: UserResource | null | undefined;
	isLoaded: boolean;
	setWasLoggedOut: Dispatch<SetStateAction<boolean>>;
	setIsNewSession: Dispatch<SetStateAction<boolean>>;
	setZennUsername: Dispatch<SetStateAction<string>>;
}

export const useSessionManagement = ({
	user,
	isLoaded,
	setWasLoggedOut,
	setIsNewSession,
	setZennUsername,
}: UseSessionManagementProps) => {
	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				if (user) {
					// ユーザーがログインしている場合
					const currentSessionId = localStorage.getItem(SESSION_ID_KEY);
					const logoutFlag = localStorage.getItem(LOGOUT_FLAG_KEY);

					// ログアウトフラグがある場合またはセッションIDが変更された場合
					if (logoutFlag === "true" || !currentSessionId || currentSessionId !== user.id) {
						// フラグをクリア
						localStorage.removeItem(LOGOUT_FLAG_KEY);
						localStorage.removeItem("zenn_previous_user");
						localStorage.setItem(SESSION_ID_KEY, user.id);

						// DBのデータは保持するため、リセット処理は行わない
						// フラグのみ設定してuseUserInfoでDBから既存のデータを取得させる
						setWasLoggedOut(true);
						setIsNewSession(true);
					}
				} else if (isLoaded && !user) {
					// ユーザーがログアウトしている場合はセッションIDを削除
					localStorage.removeItem(SESSION_ID_KEY);
					// ログアウト時にZennユーザー名をクリア（UIのみ）
					setZennUsername("");
					// ログアウト時に必ずフラグを設定
					localStorage.setItem(LOGOUT_FLAG_KEY, "true");
				}
			} catch (_error) {
				// Cache Componentsモードでstorageアクセスが制限される場合は無視
			}
		}
	}, [user, isLoaded, setWasLoggedOut, setIsNewSession, setZennUsername]);
};
