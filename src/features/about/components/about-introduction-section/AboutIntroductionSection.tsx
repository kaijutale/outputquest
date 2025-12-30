import { AboutSectionTitle } from "..";
import styles from "./AboutIntroductionSection.module.css";

export default function AboutIntroductionSection() {
	return (
		<section className={`${styles["about-section"]}`}>
			<AboutSectionTitle title="はじめに" />

			<div>
				<p className={styles["about-section-message"]}>
					「<em>OUTPUT QUEST　叡智の継承者</em>」は、アウトプットで知識を磨き、勇者を育てる
					&quot;RPG風学習支援Webアプリ&quot; です。
				</p>
				<p className={styles["about-section-message"]}>
					この世界では <em>Zenn</em>
					で記事を書くことで経験値を獲得することができ、勇者のレベルを上げることができます。
				</p>
				<p className={styles["about-section-message"]}>
					アウトプットを続けることで、あなたは<em>「叡智の継承者」</em>
					として、優れた知識と知恵を未来へとつないでいくのです。
				</p>
			</div>
		</section>
	);
}
