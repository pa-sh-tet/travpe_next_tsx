import {
	fetchAllPosts,
	fetchAllUserPosts,
	createPost,
	deletePost
} from "@/redux/actions/postActions";
import {
	IPost
	// IFetchPost
} from "@/types/Post";
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		allPosts: [] as IPost[],
		userPosts: [] as IPost[],
		status: "idle",
		error: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAllPosts.pending, state => {
				state.status = "loading";
			})
			.addCase(fetchAllPosts.fulfilled, (state, action) => {
				state.status = "succeded";
				state.allPosts = action.payload;
			})
			.addCase(fetchAllPosts.rejected, state => {
				state.status = "failed";
			})
			.addCase(fetchAllUserPosts.pending, state => {
				state.status = "loading";
			})
			.addCase(fetchAllUserPosts.fulfilled, (state, action) => {
				state.status = "succeded";
				state.userPosts = action.payload;
			})
			.addCase(fetchAllUserPosts.rejected, state => {
				state.status = "failed";
			})
			.addCase(createPost.pending, state => {
				state.status = "loading";
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.status = "succeded";
				if (action.payload) {
					state.allPosts.unshift(action.payload);
					state.userPosts.unshift(action.payload);
				}
			})

			.addCase(createPost.rejected, state => {
				state.status = "failed";
			})
			.addCase(deletePost.pending, state => {
				state.status = "loading";
			})
			.addCase(deletePost.fulfilled, state => {
				state.status = "succeded";
			})
			.addCase(deletePost.rejected, state => {
				state.status = "failed";
			});
	}
});

export const postReducer = postsSlice.reducer;
