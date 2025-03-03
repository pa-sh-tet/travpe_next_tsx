import Link from "next/link";
import styles from "@/styles/Header.module.scss";

import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/slices/authSlice";

function Header() {
	const pathname = usePathname();
	const { userToken } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	return (
		<header className={styles.nav}>
			<div className={styles.nav__container}>
				<Link href="/" className={styles.nav__logo}>
					<div className={styles["nav__logo-icon"]}></div>
					<div className={styles["nav__logo-text"]}>TravPe</div>
				</Link>
				{userToken !== null ? (
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
						<Link
							href="/login"
							className={`${styles.nav__link} ${
								pathname === "/login" ? styles.nav__link_active : ""
							}`}
							onClick={() => dispatch(logoutUser())}
						>
							<div
								className={`${styles["nav__link-icon"]} ${styles.logout_icon} ${
									pathname === "/login" ? styles.nav__link_active : ""
								}`}
							/>
							Logout
						</Link>
					</div>
				) : (
					<div className={styles.nav__links}>
						<Link
							href="/login"
							className={`${styles.nav__link} ${
								pathname === "/login" ? styles.nav__link_active : ""
							}`}
						>
							<div
								className={`${styles["nav__link-icon"]} ${styles.login_icon} ${
									pathname === "/login" ? styles.nav__link_active : ""
								}`}
							/>
							Login
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;
