"use client";

import { useState, useEffect, useCallback, DependencyList } from "react";

/**
 * 単一画像のスケルトンUI管理フック
 *
 * 画像のロード状態とタイムアウトを管理し、スケルトン表示の制御を行う。
 * - 画像がロードされたら即座にスケルトンを非表示
 * - 最大2.5秒でタイムアウトしてスケルトンを非表示
 *
 * @param deps - 依存配列（画像パスの変更時などにリセット）
 * @param timeout - タイムアウト時間（ミリ秒）、デフォルト2500ms
 * @returns showSkeleton - スケルトン表示フラグ
 * @returns onImageLoad - 画像のonLoadに渡すコールバック
 */
export function useSkeletonWithTimeout(deps: DependencyList = [], timeout = 2500) {
	const [showSkeleton, setShowSkeleton] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);

	// 依存配列が変更されたらリセット
	// Note: 依存配列変更時の状態リセットとタイマーセットのため、useEffect内でのsetStateは適切
	useEffect(() => {
		setShowSkeleton(true);
		setImageLoaded(false);
		const timer = setTimeout(() => setShowSkeleton(false), timeout);
		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	// 画像がロードされたら即座にスケルトンを非表示
	// Note: 外部状態（画像ロード）との同期のため、useEffect内でのsetStateは適切
	useEffect(() => {
		if (imageLoaded) {
			setShowSkeleton(false);
		}
	}, [imageLoaded]);

	const onImageLoad = useCallback(() => {
		setImageLoaded(true);
	}, []);

	return { showSkeleton, onImageLoad };
}

/**
 * 複数画像リストのスケルトンUI管理フック
 *
 * リスト内の画像のロード状態とタイムアウトを管理し、スケルトン表示の制御を行う。
 * - ファーストビュー画像が全てロードされたら即座にスケルトンを非表示
 * - 最大2.5秒でタイムアウトしてスケルトンを非表示
 *
 * @param itemCount - リスト内のアイテム総数
 * @param firstViewCount - ファーストビューに表示される画像数、デフォルト8
 * @param timeout - タイムアウト時間（ミリ秒）、デフォルト2500ms
 * @returns isLoading - ローディング状態フラグ
 * @returns onImageLoad - 画像のonLoadに渡すコールバック（indexを引数に取る）
 */
export function useListSkeletonWithTimeout(itemCount: number, firstViewCount = 8, timeout = 2500) {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

	// タイムアウト処理
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), timeout);
		return () => clearTimeout(timer);
	}, [timeout]);

	// ファーストビュー画像が全てロードされたらスケルトンを非表示
	// Note: 外部状態（画像ロード）との同期のため、useEffect内でのsetStateは適切
	useEffect(() => {
		const totalFirstView = Math.min(itemCount, firstViewCount);
		if (loadedImages.size >= totalFirstView) {
			setIsLoading(false);
		}
	}, [loadedImages, itemCount, firstViewCount]);

	const onImageLoad = useCallback(
		(index: number) => {
			if (index < firstViewCount) {
				setLoadedImages((prev) => new Set(prev).add(index));
			}
		},
		[firstViewCount]
	);

	return { isLoading, onImageLoad };
}
