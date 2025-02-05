import Header from "@/components/Header";
import styles from "@/styles/NewsFeed.module.scss";

export default function NewsFeed() {
	const currentUser = {
		avatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3.ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.auto=format.fit=crop.w=580.q=80",
		name: "Joe Peach",
		tag: "johndoe",
		summary: "This is a summary about me",
		followers: 100,
		following: 50,
		aboutMe: "I'm a traveler and a photographer"
	};

	return (
		<>
			<Header />
			<section className={styles.main}>
				<div className={styles.infoColumn}>
					<div className={styles.profile}>
						<div className={styles.profileFace}>
							<div
								className={styles.profileAvatar}
								style={{ backgroundImage: `url(${currentUser.avatar})` }}
							></div>
							<div className={styles.profileInfo}>
								<h3 className={styles.profileName}>{currentUser.name}</h3>
								<p className={styles.profileTag}>@{currentUser.tag}</p>
							</div>
						</div>
						<div className={styles.profileStats}>
							<div className={styles.profileStatsItem}>
								<p className={styles.profileStatsName}>Posts</p>
							</div>
							<div className={styles.profileStatsItem}>
								<p className={styles.profileStatsValue}>
									{currentUser.followers}
								</p>
								<p className={styles.profileStatsName}>Followers</p>
							</div>
							<div className={styles.profileStatsItem}>
								<p className={styles.profileStatsValue}>
									{currentUser.following}
								</p>
								<p className={styles.profileStatsName}>Following</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.postsColumn}>
					<div className={styles.posts}></div>
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
