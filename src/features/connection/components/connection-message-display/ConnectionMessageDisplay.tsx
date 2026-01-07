import styles from "./ConnectionMessageDisplay.module.css";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";

interface ConnectionMessageDisplayProps {
	error?: string;
	success?: string;
	releaseMessage?: string;
}

const ConnectionMessageDisplay: React.FC<ConnectionMessageDisplayProps> = ({
	error,
	success,
	releaseMessage,
}) => {
	if (!error && !success && !releaseMessage) {
		return null;
	}

	// ローディング中のエラーメッセージを検出
	const isLoadingError = error?.startsWith("LOADING:");
	const loadingMessage = isLoadingError
		? error?.replace("LOADING:", "") || "読み込み中"
		: "読み込み中";

	return (
		<>
			{error && (
				<strong className={styles["error-message"]}>
					{isLoadingError ? (
						<LoadingIndicator text={loadingMessage} className={styles["loading-indicator"]} />
					) : (
						error
					)}
				</strong>
			)}
			{!error && success && <p className={styles["success-message"]}>{success}</p>}
			{!error && !success && releaseMessage && (
				<p className={styles["release-message"]}>{releaseMessage}</p>
			)}
		</>
	);
};

export default ConnectionMessageDisplay;
