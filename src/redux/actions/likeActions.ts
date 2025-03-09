import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_url } from "@/api";

const API_URL = `${api_url}/likes`;

export const fetchLikesByPost = createAsyncThunk(
	"likes/fetchLikesByPost",
	async (postId: number, { rejectWithValue }) => {
		try {
			const res = await fetch(`${API_URL}/${postId}`);
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Ошибка при получении лайков");
			return { postId, likes: data }; // data – это массив лайков
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const likePost = createAsyncThunk(
	"likes/likePost",
	async (
		{ userId, postId }: { userId: number; postId: number },
		{ rejectWithValue }
	) => {
		try {
			const res = await fetch(`${API_URL}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ userId, postId })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Ошибка при добавлении лайка");
			return data; // возвращаем объект лайка
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const unlikePost = createAsyncThunk(
	"likes/unlikePost",
	async (likeId: number, { rejectWithValue }) => {
		try {
			const res = await fetch(`${API_URL}/${likeId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				}
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Ошибка при удалении лайка");
			return likeId;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
