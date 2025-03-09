import { AppDispatch, RootState } from "@/redux/store";
import styles from "@/styles/Post.module.scss";
import { IPost } from "@/types/Post";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	openDeletePostPopup,
	openEditPostPopup
} from "@/redux/slices/popupSlice";
import { useLikes } from "@/hooks/useLikes";
import { likePost, unlikePost } from "@/redux/actions/likeActions";
import { useState } from "react";

export default function Post({ post }: { post: IPost }) {
	const router = useRouter();
	const { likes, isLiked, currentUserId } = useLikes(post.id);
	const dispatch = useDispatch<AppDispatch>();
	const { userToken } = useSelector((state: RootState) => state.auth);
	const { loading } = useSelector((state: RootState) => state.likes);
	const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

	const date = new Date(post.createdAt);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	// if (router.pathname === "/") {
	// 	console.log("-------" + post.user);
	// }

	const handleLikeClick = () => {
		if (!userToken || !currentUserId) return;
		if (isLiked) {
			const userLike = likes.find(like => like.userId === currentUserId);
			if (userLike) {
				dispatch(unlikePost(userLike.id));
			}
		} else {
			dispatch(likePost({ postId: post.id, userId: currentUserId }));
		}
	};

	return router.pathname === "/" ? (
		<div className={styles.post}>
			{post.image !== null && (
				<div
					className={styles.post__image}
					// TODO: при несоответствии картинки и блока, на фоне дублировать размытую картинку
					style={{ backgroundImage: `url(${post.image})` }}
					role="image"
					aria-label="post image"
				></div>
			)}
			<div className={styles.post__container}>
				<p className={styles.post__description}>{post.content}</p>
				<div className={styles.post__info}>
					<div
						className={styles.post__avatar}
						style={{
							backgroundImage: `url(${post.user.avatar})`
						}}
					></div>
					<div className={styles.post__about}>
						<p className={styles.post__about_author}>{post.user.username}</p>

						<p className={styles.post__about_date}>{formattedDate}</p>
					</div>
					<div className={styles.post__like}>
						{loading ? (
							<div className={styles.post__like_loader}></div>
						) : (
							<>
								<p className={styles.post__like_value}>
									{likes.length === 0 ? "" : likes.length}
								</p>
								<button
									className={`${styles.post__like_button} ${
										userToken && isLiked ? styles.post__like_button_active : ""
									}`}
									onClick={handleLikeClick}
									disabled={loading}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	) : (
		<li className={styles["profile__post"]}>
			<div
				className={styles["profile__post-image"]}
				style={{ backgroundImage: "url(" + post.image + ")" }}
			></div>
			<div className={styles["profile__post-container"]}>
				<p className={styles["profile__post-description"]}>{post.content}</p>
				<div className={styles["profile__post-info"]}>
					<p className={styles["profile__post-date"]}>{formattedDate}</p>
					<div className={styles["profile__post-like"]}>
						{loading ? (
							<div className={styles["profile__post-like-loader"]}></div>
						) : (
							<>
								<p className={styles["profile__post-like-value"]}>
									{likes.length === 0 ? "" : likes.length}
								</p>
								<button
									className={`${styles["profile__post-like-button"]} ${
										isLiked ? styles["profile__post-like-button_active"] : ""
									}`}
									onClick={handleLikeClick}
								></button>
							</>
						)}
					</div>
				</div>
			</div>
			<div className={styles["profile__post-icons"]}>
				<button
					className={`${styles["profile__post-kebab"]} ${styles["profile__post-menu-icon"]} ${isKebabMenuOpen ? styles["profile__post-kebab_active"] : ""}`}
					onClick={() => setIsKebabMenuOpen(!isKebabMenuOpen)}
				/>
				<div
					className={`${styles["profile__post-etc"]} ${isKebabMenuOpen ? styles["profile__post-etc_active"] : ""}`}
				>
					<button
						className={`${styles["profile__post-edit"]} ${styles["profile__post-menu-icon"]}`}
						onClick={() => {
							dispatch(openEditPostPopup(post.id));
						}}
					></button>
					<button
						className={`${styles["profile__post-delete"]} ${styles["profile__post-menu-icon"]}`}
						onClick={() => dispatch(openDeletePostPopup(post.id))}
					></button>
				</div>
			</div>
		</li>
	);
}
