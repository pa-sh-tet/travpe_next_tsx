import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/users";

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(API_URL);
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
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("userToken");
			const response = await fetch("http://localhost:5000/users/me", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!response.ok) {
				throw new Error("Ошибка загрузки данных пользователя");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
