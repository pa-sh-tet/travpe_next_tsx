"use client";

import styles from "@/styles/Popup.module.scss";
import Popup from "./Popup";

interface PopupWithFormProps {
	title: string;
	name: string;
	status: string;
	children: React.ReactNode;
	buttonText: string;
	isOpen: boolean;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
}

function PopupWithForm({
	title,
	name,
	status,
	children,
	buttonText,
	isOpen,
	onSubmit,
	onClose
}: PopupWithFormProps) {
	return (
		<Popup isOpen={isOpen} onClose={onClose}>
			<div className={styles.popup__container}>
				<h3 className={styles.popup__title}>{title}</h3>
				<form
					name={name}
					className={styles.popup__form}
					onSubmit={onSubmit}
					noValidate
				>
					{children}
					{status === "loading" ? (
						<div className={styles["popup__button-loader"]}>
							<div className={styles["popup__button-loader-inner"]}></div>
						</div>
					) : (
						<button
							className={styles.popup__button_submit}
							disabled={status === "loading" || !isOpen}
						>
							{buttonText}
						</button>
					)}
				</form>
				<button
					onClick={onClose}
					className={styles.popup__button_close}
				></button>
			</div>
		</Popup>
	);
}

export default PopupWithForm;
