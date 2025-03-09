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

export const fetchAllUserPosts = createAsyncThunk<IPost[], number>(
	"posts/fetchAllUserPosts",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/user/${userId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				}
			});
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка загрузки постов пользователя");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchPostById = createAsyncThunk<IPost, number>(
	"posts/fetchPostById",
	async (id, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/${id}`);
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка загрузки поста");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createPost = createAsyncThunk<IPost, Partial<IPost>>(
	"posts/createPost",
	async ({ content, image, userId }, { rejectWithValue }) => {
		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ content, image, userId })
			});

			if (!response.ok) {
				throw new Error("Ошибка при создании поста");
			}

			const newPost = await response.json(); // Получаем созданный пост с сервера
			return newPost; // Возвращаем его для обновления состояния
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
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				}
			});
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updatePost = createAsyncThunk<IPost, Partial<IPost>>(
	"posts/updatePost",
	async ({ id, content, image }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ content, image })
			});

			if (!response.ok) {
				throw new Error("Ошибка при обновлении поста");
			}

			const updatedPost = await response.json(); // Получаем обновленный пост с сервера
			return updatedPost; // Возвращаем его для обновления состояния
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
