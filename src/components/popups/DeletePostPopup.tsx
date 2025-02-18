import { closeDeletePostPopup } from "@/redux/slices/popupSlice";
import PopupWithForm from "./PopupWithForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deletePost } from "@/redux/actions/postActions";

function DeletePostPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const { isDeletePostPopupOpen, postIdToDelete } = useSelector(
		(state: RootState) => state.popup
	);

	const handleDeletePost = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (postIdToDelete !== null) {
			await dispatch(deletePost(postIdToDelete));
		}
		dispatch(closeDeletePostPopup());
	}

	return (
		<PopupWithForm
			name="deletePost"
			title="Delete Post"
			buttonText="Delete"
			isOpen={isDeletePostPopupOpen}
			onSubmit={handleDeletePost}
			onClose={() => dispatch(closeDeletePostPopup())}
		>
			<p>Are you sure you want to delete this post?</p>
		</PopupWithForm>
	);
}

export default DeletePostPopup;
