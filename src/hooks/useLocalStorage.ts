"use client";

import "client-only";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { storage } from "@/utils/storage";

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
	// サーバーサイドレンダリング時は初期値のみを使用
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	// マウント後にクライアントサイドでlocalStorageから値を読み込む
	// クライアントサイドのみで実行
	useEffect(() => {
		// サーバーサイドレンダリング時は実行しない
		if (typeof window === "undefined") return;

		const item = storage.get(key);
		if (item) {
			try {
				setStoredValue(JSON.parse(item));
			} catch {
				// JSON パースに失敗した場合は初期値を使用
			}
		} else {
			// アイテムがない場合は初期値を設定
			storage.set(key, JSON.stringify(initialValue));
		}
	}, [key, initialValue]);

	// 値を設定する関数
	const setValue: Dispatch<SetStateAction<T>> = (value) => {
		// 新しい値を状態に設定
		const valueToStore = value instanceof Function ? value(storedValue) : value;
		setStoredValue(valueToStore);

		// サーバーサイドレンダリング時は実行しない
		if (typeof window !== "undefined") {
			// ローカルストレージに保存
			storage.set(key, JSON.stringify(valueToStore));
		}
	};

	return [storedValue, setValue];
}
