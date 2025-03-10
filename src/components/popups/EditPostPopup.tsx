import styles from "@/styles/PopupWithForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import {
	fetchAllUserPosts,
	fetchPostById,
	updatePost
} from "@/redux/actions/postActions";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { closeEditPostPopup } from "@/redux/slices/popupSlice";
import { IPost } from "@/types/Post";
import { isValidUrl } from "@/utils/functions";

function EditPostPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const [link, setLink] = useState("");
	const [content, setContent] = useState("");

	const [linkError, setLinkError] = useState("");
	const [contentError, setContentError] = useState("");
	const { user } = useSelector((state: RootState) => state.user);
	const { status, postDataById } = useSelector(
		(state: RootState) => state.posts
	);
	const { isEditPostPopupOpen, postIdToUpdate } = useSelector(
		(state: RootState) => state.popup
	);

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

	function resetForm() {
		if (postDataById) {
			setLink(postDataById.image || "");
			setContent(postDataById.content || "");
		}
	}

	useEffect(() => {
		resetForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditPostPopupOpen]);

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
