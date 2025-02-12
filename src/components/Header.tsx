import Link from "next/link";
import styles from "@/styles/Header.module.scss";

import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
	const pathname = usePathname();
	const [isLogin] = useState(true);

	return isLogin ? (
		<header className={styles.nav}>
			<div className={styles.nav__container}>
				<div className={styles.nav__logo}>
					<div className={styles["nav__logo-icon"]}></div>
					<div className={styles["nav__logo-text"]}>TravPe</div>
				</div>
				<div className={styles.nav__links}>
					<Link
						href="/"
						className={`${styles.nav__link} ${
							pathname === "/" ? styles.nav__link_active : ""
						}`}
					>
						<div
							className={`${styles["nav__link-icon"]} ${styles.home_icon} ${
								pathname === "/" ? styles.home_icon_active : ""
							}`}
						/>
						Home
					</Link>
					<Link
						href="/profile"
						className={`${styles.nav__link} ${
							pathname === "/profile" ? styles.nav__link_active : ""
						}`}
					>
						<div
							className={`${styles["nav__link-icon"]} ${styles.profile_icon} ${
								pathname === "/profile" ? styles.profile_icon_active : ""
							}`}
						/>
						Profile
					</Link>
				</div>
			</div>
		</header>
	) : (
		<header className={styles.nav}>
			<div className={styles.nav__container}>
				<div className={styles.nav__logo}>
					<div className={styles["nav__logo-icon"]}></div>
					<div className={styles["nav__logo-text"]}>TravPe</div>
				</div>
				<div className={styles.nav__links}>
					<Link
						href="/signin"
						className={`${styles.nav__link} ${
							pathname === "/signin" ? styles.nav__link_active : ""
						}`}
					>
						<div
							className={`${styles["nav__link-icon"]} ${styles.login_icon} ${
								pathname === "/signin" ? styles.nav__link_active : ""
							}`}
						/>
						Login
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;
