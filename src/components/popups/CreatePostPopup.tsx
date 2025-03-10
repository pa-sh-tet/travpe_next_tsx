import styles from "@/styles/PopupWithForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import { createPost, fetchAllUserPosts } from "@/redux/actions/postActions";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { closeCreatePostPopup } from "@/redux/slices/popupSlice";
import { IPost } from "@/types/Post";
import { isValidUrl } from "@/utils/functions";

function CreatePostPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const [link, setLink] = useState("");
	const [content, setContent] = useState("");

	const [linkError, setLinkError] = useState("");
	const [contentError, setContentError] = useState("");
	const { user } = useSelector((state: RootState) => state.user);
	const { isCreatePostPopupOpen } = useSelector(
		(state: RootState) => state.popup
	);
	const { status } = useSelector((state: RootState) => state.posts);

	function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}

	function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLink(e.target.value);
	}

	function resetForm() {
		setContent("");
		setLink("");
	}

	useEffect(() => {
		resetForm();
	}, [isCreatePostPopupOpen]);

	const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
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

		if (!user || !user.id || !isValid) return;

		const newPost: Partial<IPost> = {
			userId: user.id,
			content,
			image: link
		};

		await dispatch(createPost(newPost));
		dispatch(closeCreatePostPopup());
		dispatch(fetchAllUserPosts(user.id));
	};

	return (
		<PopupWithForm
			title="New Post"
			name="post"
			status={status}
			buttonText="POST"
			isOpen={isCreatePostPopupOpen}
			onSubmit={handleCreatePost}
			onClose={() => dispatch(closeCreatePostPopup())}
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

export default CreatePostPopup;
