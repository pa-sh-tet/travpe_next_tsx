"use client";

import Header from "@/components/Header";
import styles from "@/styles/Profile.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUserById, fetchUserInfo } from "@/redux/actions/userActions";
import { fetchAllUserPosts } from "@/redux/actions/postActions";
import {
	openCreatePostPopup,
	openEditUserPopup
} from "@/redux/slices/popupSlice";
import Post from "@/components/Post";
import CreatePostPopup from "@/components/popups/CreatePostPopup";
import DeletePostPopup from "@/components/popups/DeletePostPopup";
import PostSkeleton from "@/components/PostSkeleton";
import Skeleton from "react-loading-skeleton";
import EditUserPopup from "@/components/popups/EditUserPopup";
import Footer from "@/components/Footer";
import EditPostPopup from "@/components/popups/EditPostPopup";
import FullPostPopup from "@/components/popups/FullPostPopup";
import LocationPopup from "@/components/popups/LocationPopup";
import GetToLoginPopup from "@/components/popups/GetToLoginPopup";
import { IUser } from "@/interfaces/User";
import { IPost } from "@/interfaces/Post";

function Profile() {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch<AppDispatch>();

	const {
		user: currentUser,
		profileUser,
		loading
	}: {
		user: IUser | null;
		profileUser: IUser | null;
		loading: boolean;
	} = useSelector((state: RootState) => state.user); // Текущий юзер

	const { userPosts, status }: { userPosts: IPost[]; status: string } =
		useSelector((state: RootState) => state.posts);

	// Определяем, чей профиль открыт: свой или чужой
	const isMyProfile = !id || currentUser?.id === Number(id);

	useEffect(() => {
		if (isMyProfile) {
			if (!currentUser) dispatch(fetchUserInfo());
			dispatch(fetchAllUserPosts(currentUser?.id || 0));
		} else {
			dispatch(fetchUserById(Number(id)));
			dispatch(fetchAllUserPosts(Number(id)));
		}
	}, [router, dispatch, id, currentUser, isMyProfile]);

	const user = isMyProfile ? currentUser : profileUser;

	return (
		<div>
			<Header />
			<section className={styles.profile}>
				<div className={`${styles.profile__above} ${styles.profile__block}`}>
					<div className={styles.profile__face}>
						{loading || !user ? (
							<>
								<Skeleton height={120} width={120} circle={true} />
								<div className={styles.profile__info}>
									<Skeleton height={30} width={200} />
									<Skeleton height={30} width={150} />
								</div>
							</>
						) : (
							<>
								<div
									className={styles.profile__avatar}
									style={{
										backgroundImage: `url(${user !== null && user.avatar})`
									}}
								></div>
								<div className={styles.profile__info}>
									<h2 className={styles.profile__name}>{user.username}</h2>
									<p className={styles.profile__name}>{user.email}</p>
								</div>
								{isMyProfile && (
									<button
										className={styles.profile__edit}
										onClick={() => dispatch(openEditUserPopup())}
									></button>
								)}
							</>
						)}
					</div>
				</div>

				{user && (
					<div className={styles.profile__content}>
						<h2 className={styles["profile__content-title"]}>Recent Posts</h2>
						<ul className={styles["profile__content-list"]}>
							{isMyProfile && (
								<button
									className={`${styles["profile__content-add-button"]} ${styles.profile__block}`}
									onClick={() => dispatch(openCreatePostPopup())}
								>
									<div
										className={styles["profile__content-add-button-logo"]}
									></div>
									<p className={styles["profile__content-add-button-text"]}>
										Add New Post
									</p>
								</button>
							)}

							{status === "loading" ? (
								<>
									<PostSkeleton />
									<PostSkeleton />
									<PostSkeleton />
								</>
							) : (
								userPosts.map((post, index) => <Post key={index} post={post} />)
							)}
						</ul>
					</div>
				)}
			</section>

			<CreatePostPopup />
			<EditPostPopup />
			<DeletePostPopup />
			<EditUserPopup />
			<FullPostPopup />
			<LocationPopup />
			<GetToLoginPopup />

			<Footer />
		</div>
	);
}

export default Profile;
