import styles from "@/styles/FullPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { AppDispatch, RootState } from "@/redux/store";
import {
	closeFullPostPopup,
	openGetToLoginPopup
} from "@/redux/slices/popupSlice";
import { IPost } from "@/interfaces/Post";
import PostSkeleton from "../PostSkeleton";
import { useLikes } from "@/hooks/useLikes";
import { likePost, unlikePost } from "@/redux/actions/likeActions";

export default function FullPostPopup() {
	const dispatch = useDispatch<AppDispatch>();

	const {
		statusPostById,
		postDataById
	}: {
		statusPostById: string;
		postDataById: IPost | null;
	} = useSelector((state: RootState) => state.posts);

	const { likes, isLiked, currentUserId }: ReturnType<typeof useLikes> =
		useLikes(postDataById?.id || 0);

	const { userToken }: { userToken: string | null } = useSelector(
		(state: RootState) => state.auth
	);

	const { loading }: { loading: boolean } = useSelector(
		(state: RootState) => state.likes
	);

	const {
		isFullPostPopupOpen
	}: {
		isFullPostPopupOpen: boolean;
		postIdToOpen: number | null;
	} = useSelector((state: RootState) => state.popup);

	if (!postDataById) return;

	const date = new Date(postDataById.createdAt);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	const handleLikeClick = () => {
		if (!userToken || !currentUserId) {
			dispatch(openGetToLoginPopup());
			return;
		}
		if (isLiked) {
			const userLike = likes.find(like => like.userId === currentUserId);
			if (userLike) {
				dispatch(unlikePost(userLike.id));
			}
		} else {
			dispatch(likePost({ postId: postDataById.id, userId: currentUserId }));
		}
	};

	const handleClose = () => {
		dispatch(closeFullPostPopup());
	};

	return (
		<Popup isOpen={isFullPostPopupOpen} onClose={handleClose}>
			<div className={styles["full-post__container"]}>
				{statusPostById === "loading" ? (
					<PostSkeleton />
				) : (
					<>
						<div
							className={styles["full-post__image"]}
							style={{ backgroundImage: `url(${postDataById.image})` }}
						></div>
						<div className={styles["full-post__content"]}>
							<div className={styles["full-post__info"]}>
								<div
									className={styles["full-post__avatar"]}
									style={{
										backgroundImage: `url(${postDataById.user.avatar})`
									}}
								></div>
								<div className={styles["full-post__about"]}>
									<p className={styles["full-post__about-author"]}>
										{postDataById.user.username}
									</p>
									<p className={styles["full-post__about-date"]}>
										{formattedDate}
									</p>
								</div>
								<div className={styles["full-post__like"]}>
									{loading ? (
										<div className={styles["full-post__like-loader"]}></div>
									) : (
										<>
											<button
												className={`${styles["full-post__like-button"]} ${
													userToken && isLiked
														? styles["full-post__like-button_active"]
														: ""
												}`}
												onClick={handleLikeClick}
												disabled={loading}
											></button>
											<p className={styles["full-post__like-count"]}>
												{likes.length === 0 ? "" : likes.length}
											</p>
										</>
									)}
								</div>
							</div>
							<div className={styles["full-post__description"]}>
								{postDataById.content}
							</div>
						</div>
						{/* <button className={styles["full-post__close"]}></button> */}
					</>
				)}
			</div>
		</Popup>
	);
}
