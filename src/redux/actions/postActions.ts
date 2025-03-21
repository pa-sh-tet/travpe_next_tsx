import { IPost } from "@/interfaces/Post";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_url } from "@/utils/api";

const API_URL = `${api_url}/posts`;

// Получение всех постов
export const fetchAllPosts = createAsyncThunk<IPost[], void>(
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

// Получение всех постов пользователя
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

export const fetchTopLocations = createAsyncThunk<IPost[], void>(
	"posts/fetchTopLocations",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/locations/top-locations`);
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка загрузки популярных локаций");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createPost = createAsyncThunk<IPost, Partial<IPost>>(
	"posts/createPost",
	async (
		{ content, image, userId, location, latitude, longitude },
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					content,
					image,
					userId,
					location,
					latitude,
					longitude
				})
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
			const response = await fetch(`${API_URL}/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Ошибка при удалении поста");
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updatePost = createAsyncThunk<IPost, Partial<IPost>>(
	"posts/updatePost",
	async (
		{ id, content, image, location, latitude, longitude },
		{ rejectWithValue }
	) => {
		try {
			const updatedData: Partial<IPost> = {};
			if (content !== undefined) updatedData.content = content;
			if (image !== undefined) updatedData.image = image;
			if (location !== undefined) updatedData.location = location;
			if (latitude !== undefined) updatedData.latitude = latitude;
			if (longitude !== undefined) updatedData.longitude = longitude;

			const response = await fetch(`${API_URL}/${id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedData)
			});

			if (!response.ok) {
				throw new Error("Ошибка при обновлении поста");
			}

			const updatedPost = await response.json();

			return updatedPost;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
