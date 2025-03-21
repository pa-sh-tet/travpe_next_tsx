import {
	fetchAllPosts,
	fetchAllUserPosts,
	fetchPostById,
	fetchTopLocations,
	createPost,
	deletePost,
	updatePost
} from "@/redux/actions/postActions";
import { IPost } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		allPosts: [] as IPost[],
		userPosts: [] as IPost[],
		postDataById: null as IPost | null,
		topLocations: [] as IPost[],
		status: "idle",
		loadingTopLocations: false,
		statusPostById: "idle",
		error: null
	},
	reducers: {
		clearPosts: state => {
			state.allPosts = [];
			state.userPosts = [];
		},
		clearPostDataById: state => {
			state.postDataById = null;
		}
	},
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
			.addCase(fetchPostById.pending, state => {
				state.statusPostById = "loading";
			})
			.addCase(fetchPostById.fulfilled, (state, action) => {
				state.statusPostById = "succeded";
				state.postDataById = action.payload;
			})
			.addCase(fetchPostById.rejected, state => {
				state.statusPostById = "failed";
			})
			.addCase(fetchTopLocations.pending, state => {
				state.loadingTopLocations = true;
			})
			.addCase(fetchTopLocations.fulfilled, (state, action) => {
				state.loadingTopLocations = false;
				state.topLocations = action.payload;
			})
			.addCase(fetchTopLocations.rejected, state => {
				state.loadingTopLocations = false;
			})
			.addCase(createPost.pending, state => {
				state.status = "loading";
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.status = "succeded";
				if (action.payload && action.payload.id) {
					state.allPosts.unshift(action.payload);
					state.userPosts.unshift(action.payload);
				}
			})
			.addCase(createPost.rejected, state => {
				state.status = "failed";
			})
			.addCase(updatePost.pending, state => {
				state.status = "loading";
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.status = "succeded";
				const updatedPost = action.payload;
				if (updatedPost && updatedPost.id) {
					state.allPosts = state.allPosts.map(post =>
						post.id === updatedPost.id ? updatedPost : post
					);
					state.userPosts = state.userPosts.map(post =>
						post.id === updatedPost.id ? updatedPost : post
					);
				}
			})
			.addCase(updatePost.rejected, state => {
				state.status = "failed";
			})
			.addCase(deletePost.pending, state => {
				state.status = "loading";
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.allPosts = state.allPosts.filter(
					post => post.id !== action.meta.arg
				);
				state.userPosts = state.userPosts.filter(
					post => post.id !== action.meta.arg
				);
			})
			.addCase(deletePost.rejected, state => {
				state.status = "failed";
			});
	}
});

export const postReducer = postsSlice.reducer;
