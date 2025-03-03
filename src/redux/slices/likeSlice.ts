import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLikesByPost, likePost, unlikePost } from "../actions/likeActions";

interface Like {
	id: number;
	userId: number;
	postId: number;
}

interface LikesState {
	likesByPost: Record<number, Like[]>; // например, { 2: [ { id: 5, userId: 1, postId: 2 }, ... ] }
	loading: boolean;
	error: string | null;
}

const initialState: LikesState = {
	likesByPost: {},
	loading: false,
	error: null
};

const likesSlice = createSlice({
	name: "likes",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchLikesByPost.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchLikesByPost.fulfilled,
				(state, action: PayloadAction<{ postId: number; likes: Like[] }>) => {
					state.loading = false;
					state.likesByPost[action.payload.postId] = action.payload.likes;
				}
			)
			.addCase(fetchLikesByPost.rejected, state => {
				state.loading = false;
				// state.error = action.payload;
			})
			.addCase(likePost.fulfilled, (state, action: PayloadAction<Like>) => {
				const { postId } = action.payload;
				if (state.likesByPost[postId]) {
					state.likesByPost[postId].push(action.payload);
				} else {
					state.likesByPost[postId] = [action.payload];
				}
			})
			.addCase(unlikePost.fulfilled, (state, action: PayloadAction<number>) => {
				// action.payload – это likeId, но нам надо узнать постId,
				// здесь можно реализовать поиск лайка по id, если необходимо
				Object.keys(state.likesByPost).forEach(key => {
					state.likesByPost[Number(key)] = state.likesByPost[
						Number(key)
					].filter(like => like.id !== action.payload);
				});
			});
	}
});

export const likesReducer = likesSlice.reducer;
