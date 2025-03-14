import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchLikesByPost } from "../redux/actions/likeActions";
import { useEffect } from "react";
import { createSelector } from "reselect";
import { ILike } from "@/interfaces/Like";

const selectLikesByPost = (postId: number) =>
	createSelector(
		(state: RootState) => state.likes.likesByPost,
		likesByPost => likesByPost[postId] || []
	);

export const useLikes = (postId: number) => {
	const dispatch = useDispatch<AppDispatch>();
	// const likes = useSelector(
	// 	(state: RootState) => state.likes.likesByPost[postId] || []
	// );
	const likes: ILike[] = useSelector(selectLikesByPost(postId));

	const loading: boolean = useSelector(
		(state: RootState) => state.likes.loading
	);
	const error: string | null = useSelector(
		(state: RootState) => state.likes.error
	);

	const currentUserId: number | undefined = useSelector(
		(state: RootState) => state.user.user?.id
	);

	const isLiked: boolean = currentUserId
		? likes.some(like => like.userId === currentUserId)
		: false;

	useEffect(() => {
		dispatch(fetchLikesByPost(postId));
	}, [dispatch, postId]);

	return { likes, loading, error, isLiked, currentUserId };
};
