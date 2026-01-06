import * as Main from "@/features/main/components";
import styles from "./MainLayout.module.css";

import Gnav from "@/components/layout/gnav/Gnav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<Main.MainContainer>
			<div className={styles["container"]}>
				<Gnav />
				<main className={styles["main"]}>
					<div className={styles["content"]}>{children}</div>
				</main>
			</div>
		</Main.MainContainer>
	);
}
