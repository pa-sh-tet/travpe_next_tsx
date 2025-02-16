import { IPost } from "@/types/Post";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/posts";

export const fetchAllPosts = createAsyncThunk(
	"posts/fetchAllPosts",
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

export const createPost = createAsyncThunk<void, IPost>(
	"posts/createPost",
	async ({ content, image, userId }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};
			await fetch(API_URL, {
				method: "POST",
				body: JSON.stringify({ content, image, userId }),
				...config
			});
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deletePost = createAsyncThunk<void, number>(
	"posts/deletePost",
	async (id, { rejectWithValue }) => {
		try {
			await fetch(`${API_URL}/${id}`, {
				method: "DELETE"
			});
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);