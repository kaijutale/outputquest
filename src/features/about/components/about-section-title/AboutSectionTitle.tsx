import styles from "./AboutSectionTitle.module.css";

type Props = {
	title: string;
};

export default function AboutSectionTitle({ title }: Props) {
	return (
		<div className={styles["about-section-title-container"]}>
			<div className={styles["about-section-title-box"]}>
				<h2 className={styles["about-section-title"]}>{title}</h2>
			</div>
		</div>
	);
}
