import styles from "@/styles/PopupWithForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import { createPost, fetchAllUserPosts } from "@/redux/actions/postActions";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { closeCreatePostPopup } from "@/redux/slices/popupSlice";
import { IPost } from "@/types/Post";

function CreatePostPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const [link, setLink] = useState("");
	const [content, setContent] = useState("");
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

		if (!user || !user.id) return;

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
			<input
				className={styles.popup__input}
				placeholder="Content"
				id="place-input"
				name="name"
				type="text"
				value={content}
				onChange={handleContentChange}
			/>
			<span className="popup__input-error place-input-error popup__input-error_active"></span>
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
		</PopupWithForm>
	);
}

export default CreatePostPopup;
