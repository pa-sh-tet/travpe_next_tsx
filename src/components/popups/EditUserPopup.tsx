import styles from "@/styles/Popup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { closeEditUserPopup } from "@/redux/slices/popupSlice";
import {
	fetchUserInfo,
	isEmailAvailable,
	isUsernameAvailable,
	updateUser
} from "@/redux/actions/userActions";
import { IUser } from "@/interfaces/User";
import { isValidUrl } from "@/utils/functions";

function EditUserPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [avatar, setAvatar] = useState<string>("");
	const [usernameError, setUsernameError] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [avatarError, setAvatarError] = useState<string>("");
	const { user, loading }: { user: IUser | null; loading: boolean } =
		useSelector((state: RootState) => state.user);
	const { isEditUserPopupOpen }: { isEditUserPopupOpen: boolean } = useSelector(
		(state: RootState) => state.popup
	);

	useEffect(() => {
		setName(user?.username || "");
		setEmail(user?.email || "");
		setAvatar(user?.avatar || "");
	}, [user]);

	const status = loading ? "loading" : "";

	const resetForm = useCallback(() => {
		setName(user?.username || "");
		setEmail(user?.email || "");
		setAvatar(user?.avatar || "");
	}, [user]);

	useEffect(() => {
		resetForm();
	}, [isEditUserPopupOpen, resetForm]);

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAvatar(e.target.value);
	}

	const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let isValid = true;

		setUsernameError("");
		setEmailError("");
		setAvatarError("");

		if (!name) {
			setUsernameError("Name is required");
			isValid = false;
		} else if (name.length < 2 || name.length > 40) {
			setUsernameError("Name must be between 2 and 40 characters");
			isValid = false;
		} else if (name !== user?.username) {
			const available = await dispatch(isUsernameAvailable(name)).unwrap();
			if (!available) {
				setUsernameError("This name is already taken");
				isValid = false;
			}
		}

		if (!email) {
			setEmailError("Email is required");
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setEmailError("Invalid email format");
			isValid = false;
		} else if (email.length < 2) {
			setEmailError("Email must be at least 2 characters");
			isValid = false;
		} else if (email !== user?.email) {
			const available = await dispatch(isEmailAvailable(email)).unwrap();
			if (!available) {
				setEmailError("This email has already been registered");
				isValid = false;
			}
		}

		if (avatar) {
			if (avatar.length < 4) {
				setAvatarError("Avatar must be at least 4 characters");
				isValid = false;
			} else if (!isValidUrl(avatar)) {
				setAvatarError("Avatar must be a valid URL");
				isValid = false;
			}
		}

		if (!isValid) return;

		const newUserData: Partial<IUser> = {
			username: name,
			email,
			avatar
		};

		await dispatch(updateUser(newUserData));
		dispatch(closeEditUserPopup());
		dispatch(fetchUserInfo());
	};

	return (
		<PopupWithForm
			title="Edit user data"
			name="edit-user"
			status={status}
			buttonText="SAVE"
			isOpen={isEditUserPopupOpen}
			onSubmit={handleEditUser}
			onClose={() => dispatch(closeEditUserPopup())}
		>
			<div className={styles.popup__item}>
				<input
					className={styles.popup__input}
					placeholder="Name"
					id="name-input"
					name="name"
					type="text"
					required
					value={name}
					onChange={handleNameChange}
				/>
				{usernameError && (
					<span className={styles.popup__error}>{usernameError}</span>
				)}
			</div>
			<div className={styles.popup__item}>
				<input
					className={styles.popup__input}
					placeholder="Email"
					id="email-input"
					name="email"
					type="email"
					required
					value={email}
					onChange={handleEmailChange}
				/>
				{emailError && (
					<span className={styles.popup__error}>{emailError}</span>
				)}
			</div>
			<div className={styles.popup__item}>
				<input
					className={styles.popup__input}
					placeholder="Avatar URL"
					id="avatar-input"
					name="avatar"
					type="url"
					required
					value={avatar}
					onChange={handleAvatarChange}
				/>
				{avatarError && (
					<span className={styles.popup__error}>{avatarError}</span>
				)}
			</div>
		</PopupWithForm>
	);
}

export default EditUserPopup;
