"use client";

import "client-only";

import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import { useAudio } from "@/contexts/AudioContext";

// クリックサウンドのオプションタイプ定義
interface ClickSoundOptions {
	soundPath?: string;
	volume?: number;
	delay?: number; // 遅延時間（ミリ秒）
}

// クリックサウンドを再生するカスタムフック (Howler.js使用)
export const useClickSound = (options: ClickSoundOptions = {}) => {
	const soundRef = useRef<Howl | null>(null);
	const { isMuted } = useAudio();

	// デフォルト値の設定
	const {
		soundPath = "/audio/click-sound_decision.mp3",
		volume = 1,
		delay = 0, // デフォルトは遅延なし
	} = options;

	// コンポーネントマウント時に音声ファイルをロード
	useEffect(() => {
		const howlSound = new Howl({
			src: [soundPath],
			preload: true,
			volume: volume,
			html5: true,
		});

		soundRef.current = howlSound;

		return () => {
			howlSound.stop();
			howlSound.unload();
			soundRef.current = null;
		};
	}, [soundPath, volume]);

	// グローバルなミュート状態をHowlインスタンスに同期する
	useEffect(() => {
		if (soundRef.current) {
			soundRef.current.mute(isMuted);
		}
	}, [isMuted]);

	// クリックサウンドを再生する関数
	const playClickSound = useCallback(
		(callback?: () => void) => {
			const sound = soundRef.current;
			if (sound) {
				// 既に再生中の場合は停止してから再生
				if (sound.playing()) {
					sound.stop();
				}
				sound.play();
			}

			// 遅延後にコールバックを実行
			if (callback && delay > 0) {
				setTimeout(callback, delay);
			} else if (callback) {
				// 遅延なしの場合は直接実行
				callback();
			}
		},
		[delay]
	);

	return { playClickSound };
};
