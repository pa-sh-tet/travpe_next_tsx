import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (userData, { rejectWithValue }) => {
		try {
			const res = await fetch("http://localhost:5000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData)
			});
			if (!res.ok) throw new Error("Ошибка регистрации");
			return await res.json();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const res = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials)
			});
			if (!res.ok) throw new Error("Неверный логин или пароль");
			return await res.json();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
	const token = localStorage.getItem("token");
	if (!token) return null;
	const res = await fetch("http://localhost:5000/auth/me", {
		headers: { Authorization: `Bearer ${token}` }
	});
	if (!res.ok) throw new Error("Не авторизован");
	return await res.json();
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
	await fetch("http://localhost:5000/auth/logout", {
		method: "POST"
	});
});
