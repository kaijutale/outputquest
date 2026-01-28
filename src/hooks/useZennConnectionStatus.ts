"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface UseZennConnectionStatusResult {
	/** Zenn連携済みかどうか（シンプルなチェック用） */
	isZennConnected: boolean;
	/** ZennユーザーID（詳細情報が必要な場合用） */
	zennUsername: string | null;
	/** ローディング完了フラグ */
	isLoaded: boolean;
}

/**
 * Zenn連携状態を取得するフック
 *
 * ユーザーのZenn連携状態を/api/userから取得し、状態を管理する。
 * - 未ログイン: isZennConnected=false, zennUsername=null, isLoaded=true
 * - ログイン済み・Zenn未連携: isZennConnected=false, zennUsername=null, isLoaded=true
 * - ログイン済み・Zenn連携済み: isZennConnected=true, zennUsername=<username>, isLoaded=true
 *
 * @returns Zenn連携状態
 */
export function useZennConnectionStatus(): UseZennConnectionStatusResult {
	const { user, isLoaded: isUserLoaded } = useUser();
	const [zennUsername, setZennUsername] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Clerkのユーザー情報がまだ読み込まれていない場合は待機
		if (!isUserLoaded) {
			setIsLoaded(false);
			return;
		}

		// 未ログインの場合
		if (!user) {
			setZennUsername(null);
			setIsLoaded(true);
			return;
		}

		// ログイン済みの場合、Zenn連携状態を取得
		let aborted = false;

		const fetchZennStatus = async () => {
			setIsLoaded(false);

			try {
				const response = await fetch("/api/user");
				if (aborted) return;

				if (response.ok) {
					const data = await response.json();
					if (data.success && data.user?.zennUsername) {
						setZennUsername(data.user.zennUsername);
					} else {
						setZennUsername(null);
					}
				} else {
					setZennUsername(null);
				}
			} catch (error) {
				if (!aborted) {
					console.error("Zenn連携状態の取得エラー:", error);
					setZennUsername(null);
				}
			} finally {
				if (!aborted) {
					setIsLoaded(true);
				}
			}
		};

		fetchZennStatus();

		return () => {
			aborted = true;
		};
		// user?.id only - using full user object causes unnecessary re-renders
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUserLoaded, user?.id]);

	return {
		isZennConnected: zennUsername !== null,
		zennUsername,
		isLoaded,
	};
}
