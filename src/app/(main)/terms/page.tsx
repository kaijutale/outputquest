import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import styles from "./TermsPage.module.css";
import AdventureStartLink from "@/components/common/adventure-start-link/AdventureStartLink";
import TitledSection from "@/components/common/titled-section/TitledSection";

export const metadata: Metadata = getPageMetadata("terms");

const TermsPage = () => {
	return (
		<>
			<h1 className={`${styles["terms-title"]}`}>利用規約</h1>
			<div className={`${styles["terms-container"]}`}>
				<div className={`${styles["terms-content"]} w-full`}>
					<p className="text-xs sm:text-sm md:text-base leading-[1.75] font-weight-normal px-5 md:px-[50px] pt-2.5 md:pt-[30px]">
						この利用規約（以下，「本規約」といいます。）は，「OUTPUT QUEST
						叡智の継承者」（以下，「当サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，当サービスをご利用いただきます。
					</p>
					<article className={styles["terms-article"]}>
						<TitledSection title="第1条(適用)">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									本規約は，ユーザーと当サービスとの間の当サービスの利用に関わる一切の関係に適用されるものとします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスは本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									本規約の規定が前項の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第2条(利用登録)">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									当サービスにおいては，登録希望者が本規約に同意の上，当サービスの定める方法によって利用登録を申請し，当サービスが当サービスの利用を承認することによって，利用登録が完了するものとします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
									<ol className={`${styles["terms-section-list"]} mt-2.5`}>
										<li className={styles["terms-section-list-item"]}>
											利用登録の申請に際して虚偽の事項を届け出た場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											本規約に違反したことがある者からの申請である場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											その他，当サービスが利用登録を相当でないと判断した場合
										</li>
									</ol>
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第3条(ユーザーIDおよびパスワードの管理)">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									ユーザーは，自己の責任において，当サービスのユーザーIDおよびパスワードを適切に管理するものとします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当サービスは，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当サービスに故意又は重大な過失がある場合を除き，当サービスは一切の責任を負わないものとします。
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第4条(利用料金および支払方法)">
							<p className={styles["terms-section-message"]}>
								ユーザーは，当サービスの有料部分の対価として，当サービスが別途定め，本ウェブサイトに表示する利用料金を，当サービスが指定する方法により支払うものとします。
								<br />
								ユーザーが利用料金の支払を遅滞した場合には，ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
							</p>
						</TitledSection>

						<TitledSection title="第5条(禁止事項)">
							<p className={styles["terms-section-message"]}>
								ユーザーは，当サービスの利用にあたり，以下の行為をしてはなりません。
							</p>
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									法令または公序良俗に違反する行為
								</li>
								<li className={styles["terms-section-list-item"]}>犯罪行為に関連する行為</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスの内容等，当サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービス，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスによって得られた情報を商業的に利用する行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスのサービスの運営を妨害するおそれのある行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									不正アクセスをし，またはこれを試みる行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									他のユーザーに関する個人情報等を収集または蓄積する行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									不正な目的を持って当サービスを利用する行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為
								</li>
								<li className={styles["terms-section-list-item"]}>他のユーザーに成りすます行為</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスが許諾しない当サービス上での宣伝，広告，勧誘，または営業行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									面識のない異性との出会いを目的とした行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスのサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
								</li>
								<li className={styles["terms-section-list-item"]}>
									その他，当サービスが不適切と判断する行為
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第6条(当サービスの提供の停止等)">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく当サービスの全部または一部の提供を停止または中断することができるものとします。
									<ol className={`${styles["terms-section-list"]} mt-2.5`}>
										<li className={styles["terms-section-list-item"]}>
											当サービスにかかるコンピュータシステムの保守点検または更新を行う場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											地震，落雷，火災，停電または天災などの不可抗力により，当サービスの提供が困難となった場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											コンピュータまたは通信回線等が事故により停止した場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											その他，当サービスが当サービスの提供が困難と判断した場合
										</li>
									</ol>
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，当サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第7条(利用制限および登録抹消)">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，当サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
									<ol className={`${styles["terms-section-list"]} mt-2.5`}>
										<li className={styles["terms-section-list-item"]}>
											本規約のいずれかの条項に違反した場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											登録事項に虚偽の事実があることが判明した場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											料金等の支払債務の不履行があった場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											当サービスからの連絡に対し，一定期間返答がない場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											当サービスについて，最終の利用から一定期間利用がない場合
										</li>
										<li className={styles["terms-section-list-item"]}>
											その他，当サービスが当サービスの利用を適当でないと判断した場合
										</li>
									</ol>
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，本条に基づき当サービスが行った行為によりユーザーに生じた損害について，一切の責任を負いません。
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第8条(退会)">
							<p className={styles["terms-section-message"]}>
								ユーザーは，当サービスの定める退会手続により，当サービスから退会できるものとします。
							</p>
						</TitledSection>

						<TitledSection title="第9条（保証の否認および免責事項）">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，当サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，当サービスに起因してユーザーに生じたあらゆる損害について、当サービスの故意又は重過失による場合を除き、一切の責任を負いません。ただし，当サービスに関する当サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
								</li>
								<li className={styles["terms-section-list-item"]}>
									前項ただし書に定める場合であっても，当サービスは，当サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当サービスまたはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスは，当サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
								</li>
							</ol>
						</TitledSection>

						<TitledSection title="第10条(サービス内容の変更等)">
							<p className={styles["terms-section-message"]}>
								当サービスは，ユーザーに通知することなく，当サービスの内容を変更しまたは当サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
							</p>
						</TitledSection>

						<TitledSection title="第11条(利用規約の変更)">
							<p className={styles["terms-section-message"]}>
								当サービスは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，当サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
							</p>
						</TitledSection>

						<TitledSection title="第12条(個人情報の取扱い)">
							<p className={styles["terms-section-message"]}>
								当サービスは，当サービスの利用によって取得する個人情報については，当サービス「プライバシーポリシー」に従い適切に取り扱うものとします。
							</p>
						</TitledSection>

						<TitledSection title="第13条(通知または連絡)">
							<p className={styles["terms-section-message"]}>
								ユーザーと当サービスとの間の通知または連絡は，当サービスの定める方法によって行うものとします。当サービスは,ユーザーから,当サービスが別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
							</p>
						</TitledSection>

						<TitledSection title="第14条(権利義務の譲渡の禁止)">
							<p className={styles["terms-section-message"]}>
								ユーザーは，当サービスの書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
							</p>
						</TitledSection>

						<TitledSection title="第15条(準拠法・裁判管轄)">
							<ol className={styles["terms-section-list"]}>
								<li className={styles["terms-section-list-item"]}>
									本規約の解釈にあたっては，日本法を準拠法とします。
								</li>
								<li className={styles["terms-section-list-item"]}>
									当サービスに関して紛争が生じた場合には，当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。
								</li>
							</ol>
						</TitledSection>

						<hr />

						<AdventureStartLink />
					</article>
				</div>
			</div>
		</>
	);
};

export default TermsPage;
