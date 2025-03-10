import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_url } from "@/utils/api";

const API_URL = `${api_url}/users`;

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}`);
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка загрузки пользователей");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchUser = createAsyncThunk(
	"users/fetchUser",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/${id}`);
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка загрузки пользователя");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchUserInfo = createAsyncThunk(
	"users/fetchUserInfo",
	async () => {
		const res = await fetch(`${API_URL}/me`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				"Content-Type": "application/json"
			}
		});

		if (!res.ok) {
			throw new Error("Ошибка при получении данных");
		}

		return await res.json();
	}
);

export const updateUser = createAsyncThunk(
	"users/updateUser",
	// TODO add type
	async (user: unknown, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/me`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка обновления пользователя");

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const isUsernameAvailable = createAsyncThunk(
	"users/isUsernameAvailable",
	async (username: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/check-username`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ username })
			});
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка проверки имени пользователя");

			return data.available;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const isEmailAvailable = createAsyncThunk(
	"users/isEmailAvailable",
	async (email: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/check-email`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			});
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || "Ошибка проверки имени пользователя");

			return data.available;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
