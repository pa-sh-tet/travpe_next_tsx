"use client";

import Header from "@/components/Header";
import styles from "@/styles/NewsFeed.module.scss";
import Post from "@/components/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, fetchTopLocations } from "@/redux/actions/postActions";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUserInfo } from "@/redux/actions/userActions";
import PostSkeleton from "@/components/PostSkeleton";
import Skeleton from "react-loading-skeleton";
import Footer from "@/components/Footer";
import { IUser } from "@/interfaces/User";
import { IPost } from "@/interfaces/Post";
import GetToLoginPopup from "@/components/popups/GetToLoginPopup";
import LocationPopup from "@/components/popups/LocationPopup";
import FullPostPopup from "@/components/popups/FullPostPopup";
import { openLocationPopup } from "@/redux/slices/popupSlice";

export default function NewsFeed() {
	const dispatch = useDispatch<AppDispatch>();

	const {
		allPosts,
		topLocations,
		loadingTopLocations,
		status,
		error
	}: {
		allPosts: IPost[];
		topLocations: IPost[];
		loadingTopLocations: boolean;
		status: string;
		error: string | null;
	} = useSelector((state: RootState) => state.posts);

	const { userToken }: { userToken: string | null } = useSelector(
		(state: RootState) => state.auth
	);

	const { user, loading }: { user: IUser | null; loading: boolean } =
		useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (userToken) {
			dispatch(fetchUserInfo());
		}
		dispatch(fetchAllPosts());
		dispatch(fetchTopLocations());
	}, [dispatch, userToken]);

	const handleOpenLocationPopup = (locationData: IPost) => {
		dispatch(openLocationPopup(locationData));
	};

	return (
		<div>
			<div>
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
							<div className={styles.main__destinations}>
								<Skeleton height={25} width={200} />
								<ul className={styles["main__destinations-list"]}>
									<Skeleton height={16} width={200} />
									<Skeleton height={16} width={200} />
									<Skeleton height={16} width={200} />
									<Skeleton height={16} width={200} />
									<Skeleton height={16} width={200} />
								</ul>
							</div>
						</div>
					) : (
						<>
							<div className={styles["main__info-column"]}>
								{userToken && user !== null && (
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
								)}
								<div className={styles.main__destinations}>
									<h2 className={styles["main__destinations-title"]}>
										Trending Destinations
									</h2>
									<ul className={styles["main__destinations-list"]}>
										{loadingTopLocations ? (
											<>
												<Skeleton height={16} width={200} />
												<Skeleton height={16} width={200} />
												<Skeleton height={16} width={200} />
												<Skeleton height={16} width={200} />
												<Skeleton height={16} width={200} />
											</>
										) : (
											<>
												{topLocations.length > 0 ? (
													topLocations.map((destination, index) => (
														<li
															key={index}
															className={styles["main__destinations-item"]}
															onClick={() =>
																handleOpenLocationPopup(destination)
															}
														>
															<div
																className={
																	styles["main__destinations-item-image"]
																}
															/>
															<p
																className={
																	styles["main__destinations-item-name"]
																}
															>
																{destination.location}
															</p>
														</li>
													))
												) : (
													<p className={styles["main__destinations-item-name"]}>
														No posts yet
													</p>
												)}
											</>
										)}
									</ul>
								</div>
							</div>
						</>
					)}
					<div
						className={`${styles["main__posts-column"]} ${!userToken ? styles["main__posts-column_no-auth"] : ""}`}
					>
						{error && <p style={{ color: "red" }}>{error}</p>}
						{status === "loading" ? (
							<>
								<PostSkeleton />
								<PostSkeleton />
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
				<GetToLoginPopup />
				<FullPostPopup />
				<LocationPopup />
			</div>
			<Footer />
		</div>
	);
}
