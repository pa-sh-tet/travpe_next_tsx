"use client";

import Header from "@/components/Header";
import styles from "@/styles/NewsFeed.module.scss";
import Post from "@/components/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "@/redux/actions/postActions";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUserInfo } from "@/redux/actions/userActions";
import PostSkeleton from "@/components/PostSkeleton";
import Skeleton from "react-loading-skeleton";
import Footer from "@/components/Footer";

export default function NewsFeed() {
	const dispatch = useDispatch<AppDispatch>();
	const { allPosts, status, error } = useSelector(
		(state: RootState) => state.posts
	);
	const { userToken } = useSelector((state: RootState) => state.auth);
	const { user, loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (userToken !== null) {
			dispatch(fetchUserInfo());
		}
		dispatch(fetchAllPosts());
	}, [dispatch, userToken]);

	return (
		<>
			<Header />
			<section className={`${styles.main} `}>
				{loading ? (
					<div className={styles["main__info-column"]}>
						<div className={styles.main__profile}>
							<div className={styles["main__profile-face"]}>
								<Skeleton height={60} width={60} circle={true} />
								<div className={styles["main__profile-info"]}>
									<Skeleton height={20} width={100} />
									<Skeleton height={15} width={80} />
								</div>
							</div>
						</div>
					</div>
				) : (
					<>
						{userToken && user !== null && (
							<div className={styles["main__info-column"]}>
								<div className={styles.main__profile}>
									<div className={styles["main__profile-face"]}>
										<div
											className={styles["main__profile-avatar"]}
											style={{
												backgroundImage: `url(${user.avatar})`
											}}
										></div>
										<div className={styles["main__profile-info"]}>
											<h3 className={styles["main__profile-name"]}>
												{user.username}
											</h3>
											<p className={styles["main__profile-tag"]}>
												{user.email}
											</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				)}
				<div
					className={`${styles["main__posts-column"]} ${!userToken ? styles["main__posts-column_no-auth"] : ""}`}
				>
					{error && <p style={{ color: "red" }}>{error}</p>}
					{status === "loading" ? (
						<>
							<PostSkeleton />
						</>
					) : (
						<div className={styles.main__posts}>
							{allPosts.map(post => (
								<Post key={post.id} post={post} />
							))}
						</div>
					)}
				</div>
			</section>
			<Footer />
		</>
	);
}
