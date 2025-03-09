import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchLikesByPost } from "../redux/actions/likeActions";
import { useEffect } from "react";
import { createSelector } from "reselect";

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
	const likes = useSelector(selectLikesByPost(postId));

	const loading = useSelector((state: RootState) => state.likes.loading);
	const error = useSelector((state: RootState) => state.likes.error);

	const currentUserId = useSelector((state: RootState) => state.user.user?.id);

	const isLiked = currentUserId
		? likes.some(like => like.userId === currentUserId)
		: false;

	useEffect(() => {
		dispatch(fetchLikesByPost(postId));
	}, [dispatch, postId]);

	return { likes, loading, error, isLiked, currentUserId };
};
