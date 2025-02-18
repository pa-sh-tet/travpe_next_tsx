// import { ILike } from "@/types/Like";
import { ILike } from "@/types/Like";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/likes";

export const likePost = createAsyncThunk<
	number,
	{ userId: number; postId: number }
>("likes/likePost", async ({ userId, postId }, { rejectWithValue }) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId, postId })
		});

		if (!response.ok) {
			throw new Error("Ошибка при добавлении лайка");
		}

		return postId;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const unlikePost = createAsyncThunk<
	number,
	{ likeId: number; postId: number }
>("likes/unlikePost", async ({ likeId, postId }, { rejectWithValue }) => {
	try {
		const response = await fetch(`${API_URL}/${likeId}`, {
			method: "DELETE"
		});

		if (!response.ok) {
			throw new Error("Ошибка при удалении лайка");
		}

		return postId;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const fetchLikesByPost = createAsyncThunk<ILike[], number>(
	"likes/fetchLikesByPost",
	async (postId, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/${postId}`);
			const data = await response.json();
			if (!response.ok) {
				const errorText = await response.text(); // Получаем тело ошибки
				console.error("Ошибка с сервера:", errorText);
				throw new Error(`Ошибка при получении лайков: ${response.status}`);
			}

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
