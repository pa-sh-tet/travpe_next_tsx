"use client";

import Header from "@/components/Header";
import styles from "@/styles/NewsFeed.module.scss";
import Post from "@/components/Post";
// import { currentUser } from "@/data/data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/actions/postActions";
import { RootState, AppDispatch } from "@/redux/store";
import {
	// getUserInfo
	fetchUserInfo
} from "@/redux/actions/userActions";

export default function NewsFeed() {
	const dispatch = useDispatch<AppDispatch>();
	const { posts, status, error } = useSelector(
		(state: RootState) => state.posts
	);
	const { userToken } = useSelector((state: RootState) => state.auth);
	const { userInfo } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(fetchUserInfo());
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<>
			<Header />
			<section className={styles.main}>
				{userToken &&
					(userInfo !== null ? (
						<div className={styles["main__info-column"]}>
							<div className={styles.main__profile}>
								<div className={styles["main__profile-face"]}>
									<div
										className={styles["main__profile-avatar"]}
										style={{
											backgroundImage: `url(${userInfo.avatar})`
										}}
									></div>
									<div className={styles["main__profile-info"]}>
										<h3 className={styles["main__profile-name"]}>
											{userInfo.username}
										</h3>
										<p className={styles["main__profile-name"]}>
											{userInfo.email}
										</p>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className={styles["main__info-column"]}>
							<div className={styles.main__profile}>
								<div className={styles["main__profile-face"]}>
									<div className={styles["main__profile-info"]}>
										<h3 className={styles["main__profile-name"]}>
											No userInfo
										</h3>
									</div>
								</div>
							</div>
						</div>
					))}
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
