import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000";

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/users`);
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
			const response = await fetch(`${API_URL}/users/${id}`);
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
		const res = await fetch(`${API_URL}/users/me`, {
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
