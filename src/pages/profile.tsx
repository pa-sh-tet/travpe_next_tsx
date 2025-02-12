"use client";

import Header from "@/components/Header";
import styles from "@/styles/Profile.module.scss";
import {
	currentUser
	// userPosts
} from "@/data/data";
// import Post from "@/components/Post";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

export default function Profile() {
	// const currentUser = useSelector((state: RootState) => state.user);
	// const userPosts = useSelector((state: RootState) => state.posts);

	return (
		<div>
			<Header />
			<section className={styles.profile}>
				<div className={`${styles.profile__above} ${styles.profile__block}`}>
					<div className={styles.profile__face}>
						<div
							className={styles.profile__avatar}
							style={{ backgroundImage: `url(${currentUser.avatar})` }}
						></div>
						<div className={styles.profile__info}>
							<h2 className={styles.profile__name}>{currentUser.username}</h2>
							{/* <p className={styles.profile__tag}>@{currentUser.tag}</p> */}
							{/* <p className={styles.profile__summary}>{currentUser.summary}</p> */}
						</div>
						<button>LOGOUT</button>
					</div>
					{/* <ul className={styles.profile__stats}>
						<li className={styles["profile__stats-item"]}>
							<p className={styles["profile__stats-value"]}>
								{currentUser.followers}
							</p>
							<p className={styles["profile__stats-name"]}>Followers</p>
						</li>
						<li className={styles["profile__stats-item"]}>
							<p className={styles["profile__stats-value"]}>
								{currentUser.following}
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
							{currentUser.aboutMe}
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
						>
							<div className={styles["profile__content-add-button-logo"]}></div>
							<p className={styles["profile__content-add-button-text"]}>
								Add New Post
							</p>
						</button>
						{/* {userPosts.map((post, index) => (
							<Post key={index} {...post} />
						))} */}
					</ul>
				</div>
			</section>
		</div>
	);
}

// import React from "react";
// import Post from "../Post/Post";
// import { PostData, UserData } from "../../utils/types";

// function Profile({
//   userPosts,
//   currentUser,
//   onAddPost,
//   onPostLike,
//   onPostDelete
// }: {
//   userPosts: PostData[];
//   currentUser: UserData;
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
//             style={{ backgroundImage: "url(" + currentUser.avatar + ")" }}
//           ></div>
//           <div className="profile__info">
//             <h2 className="profile__name">{currentUser.name}</h2>
//             <p className="profile__tag">@{currentUser.tag}</p>
//             {/* <p className="profile__location">New York, USA</p> */}
//             <p className="profile__summary">{currentUser.summary}</p>
//           </div>
//         </div>
//         <li className="profile__stats">
//           <ul className="profile__stats-item">
//             <p className="profile__stats-value">{currentUser.followers}</p>
//             <p className="profile__stats-name">followers</p>
//           </ul>
//           <ul className="profile__stats-item">
//             <p className="profile__stats-value">{currentUser.following}</p>
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
//           <p className="profile__about-text">{currentUser.aboutMe}</p>
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
//               currentUser={currentUser}
//               onPostDelete={onPostDelete}
//             />
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }
