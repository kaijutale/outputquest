"use client";

import { memo, useState, useEffect, useCallback, useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "./ConnectionZennForm.module.css";
import Image from "next/image";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";
import { connectZenn, ZennConnectionState } from "@/features/connection/_actions/zennConnection";
import { UserInfo } from "@/features/connection/types";

interface ConnectionZennFormProps {
	initialUsername?: string;
	onSuccess?: (user: UserInfo, articleCount: number, message: string) => void;
	onError?: (error: string) => void;
	playClickSound?: () => void;
	isZennInfoLoaded?: boolean;
}

// 送信ボタンコンポーネント（useFormStatus を使用）
function SubmitButton({
	disabled,
	hasUsername,
}: {
	disabled: boolean;
	hasUsername: boolean;
}) {
	const { pending } = useFormStatus();
	const isDisabled = disabled || pending || !hasUsername;

	return (
		<button
			type="submit"
			className={`${styles["connect-button"]} ${
				!pending && hasUsername ? styles["active"] : ""
			} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
			disabled={isDisabled}
		>
			<div className={`${styles["connect-button-content"]}`}>
				{pending ? "連携中..." : "連携"}
			</div>
		</button>
	);
}

const ConnectionZennForm = memo<ConnectionZennFormProps>(function ConnectionZennForm({
	initialUsername = "",
	onSuccess,
	onError,
	playClickSound,
	isZennInfoLoaded = true,
}) {
	const [localUsername, setLocalUsername] = useState(initialUsername);
	const [state, formAction, isPending] = useActionState<ZennConnectionState | null, FormData>(
		connectZenn,
		null
	);

	// 初期値の同期
	useEffect(() => {
		if (!localUsername && initialUsername) {
			setLocalUsername(initialUsername);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialUsername]);

	// Server Action の結果を処理
	useEffect(() => {
		if (state) {
			if (state.success && state.user) {
				onSuccess?.(state.user, state.articleCount || 0, state.message || "連携完了");
			} else if (state.error) {
				onError?.(state.error);
			}
		}
	}, [state, onSuccess, onError]);

	const handleChange = useCallback((value: string) => {
		setLocalUsername(value);
	}, []);

	// フォーム送信時に音声を再生
	const handleSubmit = useCallback(() => {
		playClickSound?.();
	}, [playClickSound]);

	return (
		<div className={`grid grid-cols-1 gap-2 ${styles["zenn-connect-area"]}`}>
			<label htmlFor="zenn-username" className={`text-sm ${styles["zenn-username"]}`}>
				<Image
					src="/images/connection/connection-zenn-logo.svg"
					alt="Zenn"
					width={16}
					height={16}
					className={styles["zenn-logo-sm"]}
					priority
				/>
				<span>Zennユーザー名</span>
				<strong className="text-[#ffc630]">(必須)</strong>
			</label>
			<form action={formAction} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
				<input
					id="zenn-username"
					name="zennUsername"
					type="text"
					value={localUsername}
					onChange={(e) => handleChange(e.target.value)}
					className={styles["zenn-input"]}
					placeholder="例: aoyamadev"
					disabled={isPending}
				/>
				<SubmitButton
					disabled={!isZennInfoLoaded}
					hasUsername={!!localUsername}
				/>
			</form>
			{state?.error ? (
				""
			) : (
				<div className="text-center mt-[12px]">
					{isPending && isZennInfoLoaded ? (
						<LoadingIndicator text="連携中" className={styles["loading-indicator"]} />
					) : (
						<p>Zennと連携が必要です。</p>
					)}
				</div>
			)}
		</div>
	);
});

export default ConnectionZennForm;
