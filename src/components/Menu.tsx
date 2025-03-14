"use client";

import { logoutUser } from "@/redux/slices/authSlice";
import { closeMenuPopup } from "@/redux/slices/popupSlice";
import { AppDispatch, RootState } from "@/redux/store";
import styles from "@/styles/Menu.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Menu() {
	const dispatch = useDispatch<AppDispatch>();

	const { isMenuPopupOpen }: { isMenuPopupOpen: boolean } = useSelector(
		(state: RootState) => state.popup
	);

	if (!isMenuPopupOpen) return null;

	return (
		<div className={styles.menu}>
			<button
				className={styles.menu__close}
				onClick={() => dispatch(closeMenuPopup())}
			/>
			<nav className={styles.menu__nav}>
				<Link
					href="/"
					className={styles.menu__link}
					onClick={() => dispatch(closeMenuPopup())}
				>
					<div
						className={`${styles["menu__link-icon"]} ${styles["menu__link-icon-home"]}`}
					></div>
					{/* Home */}
				</Link>
				<Link
					href="/profile"
					className={styles.menu__link}
					onClick={() => dispatch(closeMenuPopup())}
				>
					<div
						className={`${styles["menu__link-icon"]} ${styles["menu__link-icon-profile"]}`}
					></div>
					{/* Profile */}
				</Link>
				<Link
					href="/login"
					className={styles.menu__link}
					onClick={() => {
						dispatch(closeMenuPopup());
						dispatch(logoutUser());
					}}
				>
					<div
						className={`${styles["menu__link-icon"]} ${styles["menu__link-icon-logout"]}`}
					></div>
					{/* Logout */}
				</Link>
			</nav>
		</div>
	);
}
