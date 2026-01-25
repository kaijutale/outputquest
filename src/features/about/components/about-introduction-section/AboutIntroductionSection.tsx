import styles from "./AboutIntroductionSection.module.css";
import * as About from "@/features/about/components";

export default function AboutIntroductionSection() {
	return (
		<section className={`${styles["about-section"]}`}>
			<About.AboutSectionTitle title="はじめに" />

			<div>
				<p className={styles["about-section-message"]}>
					「<em>OUTPUT QUEST　叡智の継承者</em>」は、アウトプットで知識を磨き、勇者を育てる
					&quot;RPG風学習支援Webアプリ&quot; です。
				</p>
				<div className={styles["about-section-message"]}>
					この世界では、
					<em>あなたの現実世界でのアウトプット（Zennへの投稿）が、そのまま勇者の力となります。</em>
					<p>記事を書くことで経験値を獲得し、勇者を成長させましょう。</p>
				</div>
				<p className={styles["about-section-message"]}>
					アウトプットを続けることで、あなたは<em>「叡智の継承者」</em>
					として、優れた知識と知恵を未来へとつないでいくのです。
				</p>
			</div>
		</section>
	);
}
