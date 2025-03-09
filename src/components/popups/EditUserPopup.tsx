import styles from "@/styles/PopupWithForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { closeEditUserPopup } from "@/redux/slices/popupSlice";
import { fetchUserInfo, updateUser } from "@/redux/actions/userActions";
import { IUser } from "@/types/User";

function EditUserPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("");
	const { user, loading } = useSelector((state: RootState) => state.user);
	const { isEditUserPopupOpen } = useSelector(
		(state: RootState) => state.popup
	);

	useEffect(() => {
		setName(user?.username || "");
		setEmail(user?.email || "");
		setAvatar(user?.avatar || "");
	}, [user]);

	const status = loading ? "loading" : "";

	function resetForm() {
		setName(user?.username || "");
		setEmail(user?.email || "");
		setAvatar(user?.avatar || "");
	}

	useEffect(() => {
		resetForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditUserPopupOpen]);

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
		</PopupWithForm>
	);
}

export default EditUserPopup;
