import Header from "@/components/Header";
import styles from "@/styles/NewsFeed.module.scss";
import Post from "@/components/Post";
import { currentUser } from "@/data/data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/slices/postSlice";
import { RootState, AppDispatch } from "@/redux/store";

export default function NewsFeed() {
	const isLogin = true;
	const dispatch = useDispatch<AppDispatch>();
	const { posts, status, error } = useSelector(
		(state: RootState) => state.posts
	);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<>
			<Header />
			<section className={styles.main}>
				{isLogin && (
					<div className={styles["main__info-column"]}>
						<div className={styles.main__profile}>
							<div className={styles["main__profile-face"]}>
								<div
									className={styles["main__profile-avatar"]}
									style={{ backgroundImage: `url(${currentUser.avatar})` }}
								></div>
								<div className={styles["main__profile-info"]}>
									<h3 className={styles["main__profile-name"]}>
										{currentUser.username}
									</h3>
									{/* <p className={styles["main__profile-tag"]}>
										@{currentUser.tag}
									</p> */}
								</div>
							</div>
						</div>
					</div>
				)}
				{/* <div className={styles["main__profile-stats"]}>
							<div className={styles["main__profile-stats-item"]}>
								<p className={styles["main__profile-stats-name"]}>Posts</p>
							</div>
							<div className={styles["main__profile-stats-item"]}>
								<p className={styles["main__profile-stats-value"]}>
									{currentUser.followers}
								</p>
								<p className={styles["main__profile-stats-name"]}>Followers</p>
							</div>
							<div className={styles["main__profile-stats-item"]}>
								<p className={styles["main__profile-stats-value"]}>
									{currentUser.following}
								</p>
								<p className={styles["main__profile-stats-name"]}>Following</p>
							</div>
						</div> */}
				<div className={styles["main__posts-column"]}>
					{error && <p style={{ color: "red" }}>{error}</p>}
					{status === "loading" ? (
						<p>Loading...</p>
					) : (
						<div className={styles.main__posts}>
							{posts.map(post => (
								<Post key={post.id} currentPost={post} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}

// return (
// <section className="main">
// <div className="main__info-column">
// 	<div className="main__profile block-style">
// 		<div className="main__profile-face">
// 			<div
// 				className="main__profile-avatar"
// 				style={{ backgroundImage: "url(" + currentUser.avatar + ")" }}
// 			></div>
// 			<div className="main__profile-info">
// 				<h3 className="main__profile-name">{currentUser.name}</h3>
// 				<p className="main__profile-tag">@{currentUser.tag}</p>
// 			</div>
// 		</div>
// 		<div className="main__profile-stats">
// 			<div className="main__profile-stats-item">
// 				{/* TODO отображать посты пользователя */}
// 				{/* <p className="main__profile-stats-value">{posts.length}</p> */}
// 				<p className="main__profile-stats-name">Posts</p>
// 			</div>
// 			<div className="main__profile-stats-item">
// 				<p className="main__profile-stats-value">
// 					{currentUser.followers}
// 				</p>
// 				<p className="main__profile-stats-name">Followers</p>
// 			</div>
// 			<div className="main__profile-stats-item">
// 				<p className="main__profile-stats-value">
// 					{currentUser.following}
// 				</p>
// 				<p className="main__profile-stats-name">Following</p>
// 			</div>
// 		</div>
// 	</div>
// 	<div className="main__destinations block-style">
// 		{/* TODO сделать через массив, можно также сделать слайдер */}
// 		<h2 className="main__destinations-title">Trending Destinations</h2>
// 		<ul className="main__destinations-list">
// 			{/* {topDestinations.map((destination) => (
// 				<li className="main__destinations-item">
// 					<div className="main__destinations-item-image"></div>
// 					<p className="main__destinations-item-name">{destination}</p>
// 				</li>
// 			))} */}
// 		</ul>
// 	</div>
// 	<div className="main__tags block-style">
// 		<h2 className="main__tags-title">Trending Tags</h2>
// 		<ul className="main__tags-list">
// 			{/* {trendingTags.map((hashtag) => (
// 				<li className="main__tags-item">{hashtag}</li>
// 			))} */}
// 		</ul>
// 	</div>
// </div>
// <div className="main__posts-column">
// 	<button
// 		className="main__post-add-button block-style"
// 		// onClick={onAddPost}
// 	>
// 		<div className="main__post-add-button-icon"></div>Create new post
// 	</button>
// 	<div className="main__posts">
// 		{/* {posts.map((post, index) => (
// 			<Post
// 				key={index}
// 				{...post}
// 				onPostLike={onPostLike}
// 				currentUser={currentUser}
// 				onPostDelete={onPostDelete}
// 			/>
// 		))} */}
// 	</div>
// </div>
// </section>
// )
