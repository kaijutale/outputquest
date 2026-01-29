/**
 * Storage ユーティリティ
 * localStorage / sessionStorage への安全なアクセスを提供
 * - SSR 時の window チェック
 * - Cache Components モードでのエラーハンドリング
 */

type StorageType = "local" | "session";

const getStorage = (type: StorageType): Storage | null => {
	if (typeof window === "undefined") return null;
	return type === "local" ? localStorage : sessionStorage;
};

/**
 * Storage から値を取得
 */
export const getItem = (key: string, type: StorageType = "local"): string | null => {
	const storage = getStorage(type);
	if (!storage) return null;

	try {
		return storage.getItem(key);
	} catch {
		// Cache Components モードで storage アクセスが制限される場合
		return null;
	}
};

/**
 * Storage に値を設定
 */
export const setItem = (key: string, value: string, type: StorageType = "local"): boolean => {
	const storage = getStorage(type);
	if (!storage) return false;

	try {
		storage.setItem(key, value);
		return true;
	} catch {
		// Cache Components モードで storage アクセスが制限される場合
		return false;
	}
};

/**
 * Storage から値を削除
 */
export const removeItem = (key: string, type: StorageType = "local"): boolean => {
	const storage = getStorage(type);
	if (!storage) return false;

	try {
		storage.removeItem(key);
		return true;
	} catch {
		// Cache Components モードで storage アクセスが制限される場合
		return false;
	}
};

/**
 * JSON として値を取得
 */
export const getJSON = <T>(key: string, type: StorageType = "local"): T | null => {
	const value = getItem(key, type);
	if (!value) return null;

	try {
		return JSON.parse(value) as T;
	} catch {
		return null;
	}
};

/**
 * JSON として値を設定
 */
export const setJSON = <T>(key: string, value: T, type: StorageType = "local"): boolean => {
	try {
		return setItem(key, JSON.stringify(value), type);
	} catch {
		return false;
	}
};

// 名前付きエクスポートをまとめたオブジェクト
export const storage = {
	get: getItem,
	set: setItem,
	remove: removeItem,
	getJSON,
	setJSON,
};
