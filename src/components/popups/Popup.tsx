"use client";

import styles from "@/styles/Popup.module.scss";

interface PopupProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

function Popup({ children, isOpen, onClose }: PopupProps) {
	return (
		<section className={`${styles.popup} ${isOpen ? styles.popup_active : ""}`}>
			<div className={styles.popup__overlay} onClick={onClose}></div>
			{children}
		</section>
	);
}

export default Popup;
