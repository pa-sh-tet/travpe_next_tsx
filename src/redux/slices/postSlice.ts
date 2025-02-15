import { fetchPosts } from "@/redux/actions/postActions";
import { createSlice } from "@reduxjs/toolkit";

export interface PostData {
	id: string;
	content: string;
	image?: string;
	userId: number;
	createdAt: string;
}

const postsSlice = createSlice({
	name: "posts",
	initialState: { posts: [] as PostData[], status: "idle", error: null },
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, state => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeded";
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, state => {
				state.status = "failed";
				// state.error = action.payload;
			});
	}
});

// export const { setPosts, addPost } = postsSlice.actions;
export const postReducer = postsSlice.reducer;
