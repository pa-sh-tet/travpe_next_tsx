"use client";

import Link from "next/link";
import styles from "@/styles/Header.module.scss";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/slices/authSlice";
import Menu from "./Menu";
import { openMenuPopup } from "@/redux/slices/popupSlice";

function Header() {
	const pathname = usePathname();
	const { userToken } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<Link href="/" className={styles.header__logo}>
					<div className={styles["header__logo-icon"]}></div>
					<div className={styles["header__logo-text"]}>TravPe</div>
				</Link>
				{userToken !== null ? (
					<div className={styles.header__links}>
						<Link
							href="/"
							className={`${styles.header__link} ${
								pathname === "/" ? styles.header__link_active : ""
							}`}
						>
							<div
								className={`${styles["header__link-icon"]} ${styles.home_icon} ${
									pathname === "/" ? styles.home_icon_active : ""
								}`}
							/>
							Home
						</Link>
						<Link
							href="/profile"
							className={`${styles.header__link} ${
								pathname === "/profile" ? styles.header__link_active : ""
							}`}
						>
							<div
								className={`${styles["header__link-icon"]} ${styles.profile_icon} ${
									pathname === "/profile" ? styles.profile_icon_active : ""
								}`}
							/>
							Profile
						</Link>
						<Link
							href="/login"
							className={`${styles.header__link} ${
								pathname === "/login" ? styles.header__link_active : ""
							}`}
							onClick={() => dispatch(logoutUser())}
						>
							<div
								className={`${styles["header__link-icon"]} ${styles.logout_icon} ${
									pathname === "/login" ? styles.header__link_active : ""
								}`}
							/>
							Logout
						</Link>
						<button
							className={styles.header__burger}
							onClick={() => dispatch(openMenuPopup())}
						></button>
					</div>
				) : (
					<div className={styles.header__links}>
						<Link
							href="/login"
							className={`${styles.header__link} ${
								pathname === "/login" ? styles.header__link_active : ""
							}`}
						>
							<div
								className={`${styles["header__link-icon"]} ${styles.login_icon} ${
									pathname === "/login" ? styles.header__link_active : ""
								}`}
							/>
							Login
						</Link>
					</div>
				)}
			</div>
			<Menu />
		</header>
	);
}

export default Header;
