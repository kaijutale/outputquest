import styles from "./TitledSection.module.css";

type TitledSectionProps = {
	title: string;
	children: React.ReactNode;
};

const TitledSection = ({ title, children }: TitledSectionProps) => {
	return (
		<section className={styles["section"]}>
			<div className={styles["title-container"]}>
				<div className={styles["title-box"]}>
					<h2 className={styles["title"]}>{title}</h2>
				</div>
			</div>
			{children}
		</section>
	);
};

export default TitledSection;
