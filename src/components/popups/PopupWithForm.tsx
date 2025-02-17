import styles from "@/styles/PopupWithForm.module.scss";

interface PopupWithFormProps {
	title: string;
	name: string;
	children: React.ReactNode;
	buttonText: string;
	isOpen: boolean;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
}

function PopupWithForm({
	title,
	name,
	children,
	buttonText,
	isOpen,
	onSubmit,
	onClose
}: PopupWithFormProps) {
	return (
		<section className={`${styles.popup} ${isOpen ? styles.popup_active : ""}`}>
			<div className={styles.popup__container}>
				<h3 className={styles.popup__title}>{title}</h3>
				<form name={name} className={styles.popup__form} onSubmit={onSubmit}>
					{children}
					<button className={styles.popup__button_submit}>{buttonText}</button>
				</form>
				<button
					onClick={onClose}
					className={styles.popup__button_close}
				></button>
			</div>
		</section>
	);
}

export default PopupWithForm;
