import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_url } from "@/utils/api";

const API_URL = `${api_url}/likes`;

interface Like {
	id: number;
	userId: number;
	postId: number;
}

export const fetchLikesByPost = createAsyncThunk<
	{ postId: number; likes: Like[] }, // успешный ответ (массив лайков)
	number // аргумент (postId)
>("likes/fetchLikesByPost", async (postId: number, { rejectWithValue }) => {
	try {
		const res = await fetch(`${API_URL}/${postId}`);
		const data = await res.json();

		if (!res.ok) throw new Error(data.error || "Ошибка при получении лайков");

		return { postId, likes: data }; // data – это массив лайков
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const likePost = createAsyncThunk<
	Like, // Успешный ответ
	{ userId: number; postId: number } // Аргумент
>("likes/likePost", async ({ userId, postId }, { rejectWithValue }) => {
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
});

export const unlikePost = createAsyncThunk<number, number>(
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
