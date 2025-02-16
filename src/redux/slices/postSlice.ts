import {
	fetchAllPosts,
	createPost,
	deletePost
} from "@/redux/actions/postActions";
import { IPost } from "@/types/Post";
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
	name: "posts",
	initialState: { posts: [] as IPost[], status: "idle", error: null },
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAllPosts.pending, state => {
				state.status = "loading";
			})
			.addCase(fetchAllPosts.fulfilled, (state, action) => {
				state.status = "succeded";
				state.posts = action.payload;
			})
			.addCase(fetchAllPosts.rejected, state => {
				state.status = "failed";
			})
			.addCase(createPost.pending, state => {
				state.status = "loading";
			})
			.addCase(createPost.fulfilled, state => {
				state.status = "succeded";
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
