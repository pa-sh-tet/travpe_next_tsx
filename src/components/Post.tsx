import styles from "@/styles/Post.module.scss";
import { IPost } from "@/types/Post";
// import { currentPost } from "@/data/data";
import { useRouter } from "next/router";

export default function Post({ currentPost }: { currentPost: IPost }) {
	const router = useRouter();
	const isLiked = true;

	const date = new Date(currentPost.createdAt);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	return router.pathname === "/" ? (
		<div className={styles.post}>
			{currentPost.image !== null && (
				<div
					className={styles.post__image}
					// TODO: при несоответствии картинки и блока, на фоне дублировать размытую картинку
					style={{ backgroundImage: `url(${currentPost.image})` }}
					role="image"
					aria-label="post image"
				></div>
			)}
			<div className={styles.post__container}>
				<p className={styles.post__description}>{currentPost.content}</p>
				<div className={styles.post__info}>
					<div className={styles.post__about}>
						<p className={styles.post__about_author}>{currentPost.userId}</p>
						<p className={styles.post__about_date}>{formattedDate}</p>
					</div>
					{/* <div className={styles.post__location}>
						<div className={styles.post__location_icon}></div>
						<p className={styles.post__location_value}>
							{currentPost.location}
						</p>
					</div> */}
					<div className={styles.post__like}>
						<button
							className={`${styles.post__like_button} ${
								isLiked ? styles.post__like_button_active : ""
							}`}
							// onClick={handleLikeClick}
						></button>
						<p className={styles.post__likes_value}>{/* {likes.length} */}5</p>
					</div>
				</div>
			</div>
		</div>
	) : (
		<li className={styles["profile__post"]}>
			<div
				className={styles["profile__post-image"]}
				style={{ backgroundImage: "url(" + currentPost.image + ")" }}
			></div>
			<div className={styles["profile__post-container"]}>
				<p className={styles["profile__post-description"]}>
					{currentPost.content}
				</p>
				<div className={styles["profile__post-info"]}>
					<p className={styles["profile__post-date"]}>
						{currentPost.createdAt}
					</p>
					<div className={styles["profile__post-like"]}>
						<button
							className={`${styles["profile__post-like-button"]} ${
								isLiked ? styles["profile__post-like-button_active"] : ""
							}`}
							// onClick={handleLikeClick}
						></button>
						<p className={styles["profile__post-like-value"]}>
							{/* {currentPost.likes.length} */}5
						</p>
					</div>
				</div>
			</div>
			<button
				className={styles["profile__post-delete"]}
				// onClick={handleDeleteClick}
			></button>
		</li>
	);
}

{
	/* TODO Добавить отоюражение локации в гугл картах */
}
// import React from "react";
// import { useLocation } from "react-router-dom";
// import { PostData, UserData } from "../../utils/types";

// function Post({
//   image,
//   description,
//   author,
//   date,
//   likes,
//   onPostLike,
//   currentUser,
//   placeLocation,
//   onPostDelete,
// }: PostData & {
//   onPostLike: (post: PostData) => void;
//   onPostDelete: (post: PostData) => void;
// } & {
//   currentUser: UserData;
// }) {
//   const location = useLocation();
//   const isLiked = likes.includes(currentUser.tag);

//   const handleLikeClick = () => {
//     const newLikes = isLiked
//       ? likes.filter((tag) => tag !== currentUser.tag)
//       : [...likes, currentUser.tag];
//     onPostLike({
//       image,
//       description,
//       author,
//       date,
//       placeLocation,
//       likes: newLikes,
//     });
//   };

//   const handleDeleteClick = () => {
//     onPostDelete({
//       image,
//       description,
//       author,
//       date,
//       placeLocation,
//       likes,
//     });
//   };

//   // TODO при наведении на картинку, посередине отображается локация
//   return location.pathname === "/" ? (
//     <div className="main__post">
//       <div
//         className="main__post-image"
//         // TODO при не совпадении картинки и блока, на фоне дублировать размытую картинку
//         style={{ backgroundImage: "url(" + image + ")" }}
//       ></div>
//       <div className="main__post-container">
//         <p className="main__post-description">{description}</p>
//         <div className="main__post-info">
//           <div className="main__post-about">
//             <p className="main__post-author">{author}</p>
//             <p className="main__post-date">{date}</p>
//           </div>
//           <div className="main__post-location">
//             <div className="main__post-location-icon"></div>
//             {/* TODO Добавить отоюражение локации в гугл картах */}
//             <p className="main__post-location-value">{placeLocation}</p>
//           </div>
//           <div className="main__post-likes">
//             <button
//               className={`main__post-like-button ${
//                 isLiked ? "profile__post-like-button_active" : ""
//               }`}
//               onClick={handleLikeClick}
//             ></button>
//             <p className="main__post-likes-value">{likes.length}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     // TODO Добавить локацию как в main
//     <li className="profile__post">
//       <div
//         className="profile__post-image"
//         style={{ backgroundImage: "url(" + image + ")" }}
//       ></div>
//       <div className="profile__post-container">
//         <p className="profile__post-description">{description}</p>
//         <div className="profile__post-info">
//           <p className="profile__post-date">{date}</p>
//           <div className="profile__post-likes">
//             <button
//               className={`profile__post-like-button ${
//                 isLiked ? "profile__post-like-button_active" : ""
//               }`}
//               onClick={handleLikeClick}
//             ></button>
//             <p className="profile__post-likes-value">{likes.length}</p>
//           </div>
//         </div>
//       </div>
//       <button
//         className="profile__post-delete"
//         onClick={handleDeleteClick}
//       ></button>
//     </li>
//   );
// }

// export default Post;
