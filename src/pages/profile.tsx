"use client";

import Header from "@/components/Header";
import styles from "@/styles/Profile.module.scss";
// import {
// 	currentUser
// 	// userPosts
// } from "@/data/data";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUserInfo } from "@/redux/actions/userActions";
import { openCreatePostPopup } from "@/redux/slices/popupSlice";
import Post from "@/components/Post";
import { fetchAllUserPosts } from "@/redux/actions/postActions";
import CreatePostPopup from "@/components/popups/CreatePostPopup";
import DeletePostPopup from "@/components/popups/DeletePostPopup";

function Profile() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.user);
	const { userPosts } = useSelector((state: RootState) => state.posts);
	// console.log("🚀 ~ Profile ~ userPosts:", userPosts);

	useEffect(() => {
		const userToken = localStorage.getItem("userToken");
		if (!userToken) {
			router.push("/login");
		} else {
			if (!user) {
				dispatch(fetchUserInfo());
			} else {
				dispatch(fetchAllUserPosts(user.id));
			}
		}
	}, [router, dispatch, user]);

	return (
		<div>
			<Header />
			<section className={styles.profile}>
				<div className={`${styles.profile__above} ${styles.profile__block}`}>
					<div className={styles.profile__face}>
						<div
							className={styles.profile__avatar}
							style={{
								backgroundImage: `url(${user !== null && user.avatar})`
							}}
						></div>
						<div className={styles.profile__info}>
							<h2 className={styles.profile__name}>
								{user !== null ? user.username : "нет пользователя"}
							</h2>
							<p className={styles.profile__name}>
								{user !== null ? user.email : "нет пользователя"}
							</p>
							{/* <p className={styles.profile__tag}>@{user.tag}</p> */}
							{/* <p className={styles.profile__summary}>{user.summary}</p> */}
						</div>
					</div>
					{/* <ul className={styles.profile__stats}>
						<li className={styles["profile__stats-item"]}>
							<p className={styles["profile__stats-value"]}>
								{user.followers}
							</p>
							<p className={styles["profile__stats-name"]}>Followers</p>
						</li>
						<li className={styles["profile__stats-item"]}>
							<p className={styles["profile__stats-value"]}>
								{user.following}
							</p>
							<p className={styles["profile__stats-name"]}>Following</p>
						</li>
						<li className={styles["profile__stats-item"]}>
							<p className={styles["profile__stats-value"]}>
								{userPosts.length}
							</p>
							<p className={styles["profile__stats-name"]}>Posts</p>
						</li>
					</ul> */}
				</div>
				{/* <div className={styles.profile__bio}>
					<div className={`${styles.profile__about} ${styles.profile__block}`}>
						<h3 className={styles["profile__about-title"]}>About Me</h3>
						<p className={styles["profile__about-text"]}>
							{user.aboutMe}
						</p>
						<ul className={styles["profile__about-skills"]}>
							<li className={styles["profile__about-skill"]}>Adventure</li>
							<li className={styles["profile__about-skill"]}>Photography</li>
							<li className={styles["profile__about-skill"]}>Backpacking</li>
							<li className={styles["profile__about-skill"]}>Culture</li>
						</ul>
					</div>
					<div
						className={`${styles["profile__travel-stats"]} ${styles.profile__block}`}
					>
						<h3 className={styles["profile__travel-stats-title"]}>
							Travel Stats
						</h3>
						<ul className={styles["profile__travel-stats-list"]}>
							<li className={styles["profile__travel-stats-item"]}>
								<div className={styles["profile__travel-stats-logo"]}></div>
								<p className={styles["profile__travel-stats-name"]}>
									Countries Visited
								</p>
								<p className={styles["profile__travel-stats-value"]}>30</p>
							</li>
							<li className={styles["profile__travel-stats-item"]}>
								<div className={styles["profile__travel-stats-logo"]}></div>
								<p className={styles["profile__travel-stats-name"]}>
									Cities Explored
								</p>
								<p className={styles["profile__travel-stats-value"]}>120+</p>
							</li>
							<li className={styles["profile__travel-stats-item"]}>
								<div className={styles["profile__travel-stats-logo"]}></div>
								<p className={styles["profile__travel-stats-name"]}>
									Flights Taken
								</p>
								<p className={styles["profile__travel-stats-value"]}>75</p>
							</li>
							<li className={styles["profile__travel-stats-item"]}>
								<div className={styles["profile__travel-stats-logo"]}></div>
								<p className={styles["profile__travel-stats-name"]}>
									Hostels Stayed
								</p>
								<p className={styles["profile__travel-stats-value"]}>50</p>
							</li>
						</ul>
					</div>
				</div> */}
				<div className={styles.profile__content}>
					<h2 className={styles["profile__content-title"]}>Recent Posts</h2>
					<ul className={styles["profile__content-list"]}>
						<button
							className={`${styles["profile__content-add-button"]} ${styles.profile__block}`}
							onClick={() => dispatch(openCreatePostPopup())}
						>
							<div className={styles["profile__content-add-button-logo"]}></div>
							<p className={styles["profile__content-add-button-text"]}>
								Add New Post
							</p>
						</button>
						{userPosts.map((post, index) => (
							<Post key={index} post={post} />
						))}
					</ul>
				</div>
			</section>
			<CreatePostPopup />
			<DeletePostPopup />
		</div>
	);
}

export default Profile;

// import React from "react";
// import Post from "../Post/Post";
// import { PostData, UserData } from "../../utils/types";

// function Profile({
//   userPosts,
//   user,
//   onAddPost,
//   onPostLike,
//   onPostDelete
// }: {
//   userPosts: PostData[];
//   user: UserData;
//   onAddPost: () => void;
//   onPostLike: (post: PostData) => void;
//   onPostDelete: (post: PostData) => void;
// }) {
//   return (
//     <section className="profile">
//       <div className="profile__above profile__block-style">
//         <div className="profile__face">
//           <div
//             className="profile__avatar"
//             style={{ backgroundImage: "url(" + user.avatar + ")" }}
//           ></div>
//           <div className="profile__info">
//             <h2 className="profile__name">{user.name}</h2>
//             <p className="profile__tag">@{user.tag}</p>
//             {/* <p className="profile__location">New York, USA</p> */}
//             <p className="profile__summary">{user.summary}</p>
//           </div>
//         </div>
//         <li className="profile__stats">
//           <ul className="profile__stats-item">
//             <p className="profile__stats-value">{user.followers}</p>
//             <p className="profile__stats-name">followers</p>
//           </ul>
//           <ul className="profile__stats-item">
//             <p className="profile__stats-value">{user.following}</p>
//             <p className="profile__stats-name">following</p>
//           </ul>
//           <ul className="profile__stats-item">
//             <p className="profile__stats-value">{userPosts.length}</p>
//             <p className="profile__stats-name">posts</p>
//           </ul>
//         </li>
//       </div>
//       <div className="profile__bio">
//         <div className="profile__about profile__block-style">
//           <h3 className="profile__about-title">About Me</h3>
//           <p className="profile__about-text">{user.aboutMe}</p>
//           <ul className="profile__about-skills">
//             <li className="profile__about-skill">Adventure</li>
//             <li className="profile__about-skill">Photography</li>
//             <li className="profile__about-skill">Backpacking</li>
//             <li className="profile__about-skill">Culture</li>
//           </ul>
//         </div>
//         {/* TODO сделать отображение локации вместо этого */}
//         <div className="profile__travel-stats profile__block-style">
//           <h3 className="profile__travel-stats-title">Travel Stats</h3>
//           {/* TODO сделать отображение itemoв из массива через map */}
//           <li className="profile__travel-stats-list">
//             <ul className="profile__travel-stats-item">
//               <div className="profile__travel-stats-logo"></div>
//               <p className="profile__travel-stats-name">Countries Visite</p>
//               <p className="profile__travel-stats-value">
//                 {/* TODO сделать подсчет статистики */}
//                 30
//               </p>
//             </ul>
//             <ul className="profile__travel-stats-item">
//               {/* TODO иконки загрузить */}
//               <div className="profile__travel-stats-logo"></div>
//               <p className="profile__travel-stats-name">Cities Explored</p>
//               <p className="profile__travel-stats-value">120+</p>
//             </ul>
//             <ul className="profile__travel-stats-item">
//               <div className="profile__travel-stats-logo"></div>
//               <p className="profile__travel-stats-name">Flights Taken</p>
//               <p className="profile__travel-stats-value">75</p>
//             </ul>
//             <ul className="profile__travel-stats-item">
//               <div className="profile__travel-stats-logo"></div>
//               <p className="profile__travel-stats-name">Hostels Stayed</p>
//               <p className="profile__travel-stats-value">50</p>
//             </ul>
//           </li>
//         </div>
//       </div>
//       <div className="profile__content">
//         <h2 className="profile__content-title">Recent Posts</h2>
//         <ul className="profile__content-list">
//           <button
//             className="profile__content-add-button block-style"
//             onClick={onAddPost}
//           >
//             <div className="profile__content-add-logo"></div>
//             <p className="profile__content-add-text">Add New Post</p>
//           </button>
//           {userPosts.map((post, index) => (
//             <Post
//               key={index}
//               {...post}
//               onPostLike={onPostLike}
//               user={user}
//               onPostDelete={onPostDelete}
//             />
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }
