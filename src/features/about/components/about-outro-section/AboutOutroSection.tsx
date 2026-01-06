import AdventureStartLink from "@/components/common/adventure-start-link/AdventureStartLink";
import * as About from "@/features/about/components";
import styles from "./AboutOutroSection.module.css";

export default function AboutOutroSection() {
	return (
		<>
			<section className={`${styles["about-section"]}`}>
				<About.AboutSectionTitle title="冒険を始める" />

				<p className={styles["about-section-message"]}>
					アウトプットは知識を定着させる最も効果的な方法です。
				</p>
				<p className={styles["about-section-message"]}>
					インプットだけでは、得た知識は時間と共に薄れていきますが、アウトプットすることで自分の言葉として知識を再構築し、深い理解へと昇華させることができます。
				</p>
				<p className={styles["about-section-message"]}>
					記事を書くことで、あなたの中の「曖昧な理解」は「確かな知識」へと変わります。整理された思考、明確な表現力、論理的な構成力が磨かれ、自分自身の成長を実感できるでしょう。
				</p>
				<p className={styles["about-section-message"]}>
					そして、あなたのアウトプットは他者の「インプット」となり、知識の循環を生み出します。あなたの記事が誰かの疑問を解決し、誰かの学びを加速させ、新たな知の創造につながるのです。これこそが「叡智の継承」の真髄です。
				</p>
				<p className={styles["about-section-message"]}>
					「OUTPUT
					QUEST　叡智の継承者」は、アウトプットをRPG風の楽しい体験に変え、継続的な成長をサポートします。勇者がレベルアップする喜び、獲得の称号、仲間との出会いやアイテムの入手という達成感を通じて、あなたの学びの冒険をより豊かなものへと導きます。
				</p>
				<p className={styles["about-section-message"]}>
					アウトプットに完璧な準備は必要ありません。大切なのは、アウトプットをすることで得られる「本質的な理解」です。アウトプットを続けて自己成長へ繋げることで、自らを「学びの勇者」へと導くのです。
				</p>
			</section>

			<p className={styles["about-section-last-message"]}>
				<span className={styles["about-section-last-message-text"]}>さあ、学びの勇者よ...</span>
				<span className={styles["about-section-last-message-text"]}>
					あなたの学びの冒険が今、始まります。
				</span>
			</p>

			<hr />

			<AdventureStartLink />
		</>
	);
}
