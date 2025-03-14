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

			// Загрузка лайков на конкретном посте
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
			.addCase(fetchLikesByPost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Лайк поста
			.addCase(likePost.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(likePost.fulfilled, (state, action: PayloadAction<Like>) => {
				state.loading = false;
				const { postId } = action.payload;
				if (state.likesByPost[postId]) {
					state.likesByPost[postId].push(action.payload);
				} else {
					state.likesByPost[postId] = [action.payload];
				}
			})
			.addCase(likePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Удаление лайка
			.addCase(unlikePost.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(unlikePost.fulfilled, (state, action: PayloadAction<number>) => {
				state.loading = false;
				Object.keys(state.likesByPost).forEach(key => {
					state.likesByPost[Number(key)] = state.likesByPost[
						Number(key)
					].filter(like => like.id !== action.payload);
				});
			})
			.addCase(unlikePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	}
});

export const likesReducer = likesSlice.reducer;
