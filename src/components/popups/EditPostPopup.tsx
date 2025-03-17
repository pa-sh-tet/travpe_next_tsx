import styles from "@/styles/Popup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import {
	fetchAllUserPosts,
	fetchPostById,
	updatePost
} from "@/redux/actions/postActions";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { closeEditPostPopup } from "@/redux/slices/popupSlice";
import { IPost } from "@/interfaces/Post";
import { isValidUrl } from "@/utils/functions";
import { IUser } from "@/interfaces/User";

function EditPostPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const [link, setLink] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [linkError, setLinkError] = useState<string>("");
	const [contentError, setContentError] = useState<string>("");

	const { user }: { user: IUser | null } = useSelector(
		(state: RootState) => state.user
	);

	const {
		status,
		postDataById
	}: { status: string; postDataById: IPost | null } = useSelector(
		(state: RootState) => state.posts
	);

	const {
		isEditPostPopupOpen,
		postIdToUpdate
	}: { isEditPostPopupOpen: boolean; postIdToUpdate: number | null } =
		useSelector((state: RootState) => state.popup);

	useEffect(() => {
		if (isEditPostPopupOpen && postIdToUpdate) {
			dispatch(fetchPostById(postIdToUpdate));
		}
	}, [isEditPostPopupOpen, postIdToUpdate, dispatch]);

	useEffect(() => {
		if (postDataById) {
			setLink(postDataById.image || "");
			setContent(postDataById.content || "");
		}
	}, [postDataById]);

	const resetForm = useCallback(() => {
		if (postDataById) {
			setLink(postDataById.image || "");
			setContent(postDataById.content || "");
		}
	}, [postDataById]);

	useEffect(() => {
		resetForm();
	}, [isEditPostPopupOpen, resetForm]);

	if (!user || !user.id || !postIdToUpdate) return;

	function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}

	function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLink(e.target.value);
	}

	const handleEditPost = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let isValid = true;

		setContentError("");
		setLinkError("");

		if (!content) {
			setContentError("Content is required");
			isValid = false;
		}

		if (!link) {
			setLinkError("Link is required");
			isValid = false;
		} else if (!isValidUrl(link)) {
			setLinkError("Link must be a valid URL");
			isValid = false;
		} else if (link.length < 4) {
			setLinkError("Link must be at least 4 characters");
			isValid = false;
		}

		if (!isValid) return;

		const newPost: Partial<IPost> = {
			id: postIdToUpdate,
			content,
			image: link
		};

		await dispatch(updatePost(newPost));
		dispatch(closeEditPostPopup());
		dispatch(fetchAllUserPosts(user.id));
	};

	return (
		<PopupWithForm
			title="Edit Post"
			name="edit-post"
			status={status}
			buttonText="SAVE"
			isOpen={isEditPostPopupOpen}
			onSubmit={handleEditPost}
			onClose={() => dispatch(closeEditPostPopup())}
		>
			<div className={styles.popup__item}>
				<input
					className={styles.popup__input}
					placeholder="Content"
					id="place-input"
					name="name"
					type="text"
					value={content}
					onChange={handleContentChange}
				/>
				{contentError && (
					<span className={styles.popup__error}>{contentError}</span>
				)}
			</div>
			<div className={styles.popup__item}>
				<input
					className={styles.popup__input}
					placeholder="Image link"
					id="link-input"
					name="link"
					type="url"
					required
					value={link}
					onChange={handleLinkChange}
				/>
				{linkError && <span className={styles.popup__error}>{linkError}</span>}
			</div>
		</PopupWithForm>
	);
}

export default EditPostPopup;
