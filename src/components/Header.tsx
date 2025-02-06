import Link from "next/link";
import styles from "@/styles/Header.module.scss";

// import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useAuthContext } from "./AuthContext";
// import { useSession } from "next-auth/react";

function Header() {
	const pathname = usePathname();
	// const session = useSession();

	// console.log(session);

	return (
		<>
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
			{/* {pathname !== "/signin" && pathname !== "/signup" && (
        <header className="nav">
          <div className="nav__container">
            <div className="nav__logo">
              <div className="nav__logo-icon"></div>
              <div className="nav__logo-text">TravPe</div>
            </div>
            <div className="nav__links">
              {session?.data ? (
                <>
                  <Link
                    href="/"
                    className={`nav__link ${
                      pathname === "/" ? "nav__link_active" : ""
                    }`}
                  >
                    <div
                      className={`nav__link-icon home-icon ${
                        pathname === "/" ? "home-icon_active" : ""
                      }`}
                    />
                    Home
                  </Link>
                  <Link
                    href="/profile"
                    className={`nav__link ${
                      pathname === "/profile" ? "nav__link_active" : ""
                    }`}
                  >
                    <div
                      className={`nav__link-icon profile-icon ${
                        pathname === "/profile" ? "profile-icon_active" : ""
                      }`}
                    />
                    Profile
                  </Link>
                  <Link href="/settings" className="nav__link">
                    <div
                      className={`nav__link-icon settings-icon ${
                        pathname === "/settings" ? "settings-icon_active" : ""
                      }`}
                    />
                    Settings
                  </Link>
                </>
              ) : (
                <Link href="/signin" className="nav__link">
                  <div
                    className={`nav__link-icon login-icon ${
                      pathname === "/signin" ? "login-icon_active" : ""
                    }`}
                  />
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>
      )} */}
		</>
	);
}

export default Header;
