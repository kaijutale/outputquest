"use client";

import "client-only";

import { useState, useEffect } from "react";

/**
 * マウント状態を追跡するカスタムフック
 *
 * SSR/CSR の境界で、クライアントサイドでのみ表示したいコンテンツに使用する。
 * ハイドレーションミスマッチを防ぐために、マウント後にのみ true を返す。
 *
 * @example
 * ```tsx
 * const mounted = useMounted();
 *
 * if (!mounted) {
 *   return <Skeleton />;
 * }
 *
 * return <ClientOnlyContent />;
 * ```
 */
export function useMounted(): boolean {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}
