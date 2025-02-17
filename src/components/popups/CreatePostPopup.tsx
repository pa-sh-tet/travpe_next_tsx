// import styles from "@/styles/CreatePostPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";
import { createPost } from "@/redux/actions/postActions";
import { useState } from "react";
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

	function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}

	function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLink(e.target.value);
	}

	const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!user || !user.id) return;

		const newPost: Partial<IPost> = {
			userId: user.id,
			content,
			image: link
		};

		dispatch(createPost(newPost));
		dispatch(closeCreatePostPopup());
	};

	return (
		<PopupWithForm
			title="Новый пост"
			name="post"
			buttonText="Создать"
			isOpen={isCreatePostPopupOpen}
			onSubmit={handleCreatePost}
			onClose={() => dispatch(closeCreatePostPopup())}
		>
			<input
				placeholder="Название места"
				id="place-input"
				name="name"
				type="text"
				value={content}
				onChange={handleContentChange}
			/>
			<span className="popup__input-error place-input-error popup__input-error_active"></span>
			<input
				placeholder="Ссылка на картинку"
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
