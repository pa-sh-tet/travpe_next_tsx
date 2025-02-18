import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	// likePost, unlikePost,
	fetchLikesByPost
} from "../actions/likeActions";
import { ILike } from "@/types/Like";

interface LikeState {
	likesByPost: Record<number, ILike[]>; // Объект { postId: массив ILike }
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: LikeState = {
	likesByPost: {},
	status: "idle",
	error: null
};

const likeSlice = createSlice({
	name: "likes",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchLikesByPost.pending, state => {
				state.status = "loading";
			})
			.addCase(
				fetchLikesByPost.fulfilled,
				(state, action: PayloadAction<ILike[]>) => {
					state.status = "succeeded";

					// Проверяем, есть ли лайки
					if (action.payload.length > 0) {
						const postId = action.payload[0].postId;
						state.likesByPost[postId] = action.payload;
					} else {
						console.warn("⚠ Нет лайков для поста, сохраняем пустой массив.");
					}
				}
			)

			.addCase(fetchLikesByPost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
		// .addCase(
		// 	likePost.fulfilled,
		// 	(state, action: PayloadAction<{ postId: number; like: ILike }>) => {
		// 		const { postId, like } = action.payload;
		// 		if (state.likesByPost[postId]) {
		// 			state.likesByPost[postId].push(like);
		// 		} else {
		// 			state.likesByPost[postId] = [like];
		// 		}
		// 	}
		// )
		// .addCase(
		// 	unlikePost.fulfilled,
		// 	(state, action: PayloadAction<{ postId: number; likeId: number }>) => {
		// 		const { postId, likeId } = action.payload;
		// 		if (state.likesByPost[postId]) {
		// 			state.likesByPost[postId] = state.likesByPost[postId].filter(
		// 				like => like.id !== likeId
		// 			);
		// 		}
		// 	}
		// );
	}
});

export const likeReducer = likeSlice.reducer;
