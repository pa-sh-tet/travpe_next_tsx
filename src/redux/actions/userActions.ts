import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_url } from "@/utils/api";
import { IUser } from "@/interfaces/User";

const API_URL = `${api_url}/users`;

export const fetchUsers = createAsyncThunk<IUser[], void>(
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

export const fetchUser = createAsyncThunk<IUser, number>(
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

export const fetchUserInfo = createAsyncThunk<IUser, void>(
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

// Update user
export const updateUser = createAsyncThunk<IUser, Partial<IUser>>( // Partial потому что мы можем обновить только часть полей
	"users/updateUser",
	async (user: Partial<IUser>, { rejectWithValue }) => {
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

export const isUsernameAvailable = createAsyncThunk<boolean, string>(
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

export const isEmailAvailable = createAsyncThunk<boolean, string>(
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

export const fetchUserById = createAsyncThunk<IUser, number>(
	"user/fetchById",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
