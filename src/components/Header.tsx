import Link from "next/link";
import styles from "@/styles/Header.module.scss";

import { usePathname } from "next/navigation";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Header() {
	const pathname = usePathname();
	const { userToken } = useSelector((state: RootState) => state.auth);
	// const dispatch = useDispatch();

	// const [isLogin] = useState(false);

	return (
		<header className={styles.nav}>
			{userToken !== null ? (
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
			) : (
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
			)}
		</header>
	);
}

export default Header;
