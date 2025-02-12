// import { fetchPosts } from "./../actions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/posts";

export interface PostData {
	id: string;
	content: string;
	image?: string;
	userId: number;
	createdAt: string;
}

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка загрузки постов");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

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
