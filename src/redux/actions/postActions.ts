import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/posts";

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
