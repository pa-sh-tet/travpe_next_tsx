// import { api } from "../api";
// import { setUser } from "./slices/userSlice";
// import { setPosts } from "./slices/postSlice";
// import { AppDispatch } from "./store";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchPosts = () => async (dispatch: AppDispatch) => {
// 	try {
// 		const response = await api.get("/posts");
// 		dispatch(setPosts(response.data));
// 	} catch (error) {
// 		console.error("Ошибка загрузки постов", error);
// 	}
// };

// export const loginUser =
// 	(credentials: { email: string; password: string }) =>
// 	async (dispatch: AppDispatch) => {
// 		try {
// 			const response = await api.post("/auth/login", credentials);
// 			dispatch(setUser(response.data.user));
// 			localStorage.setItem("token", response.data.token);
// 		} catch (error) {
// 			console.error("Ошибка входа:", error);
// 		}
// 	};

// export const checkAuth = createAsyncThunk(
// 	"auth/checkAuth",
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			const token = localStorage.getItem("token");

// 			if (!token) return rejectWithValue("No token");

// 			const response = await fetch("http://localhost:5000/auth/me", {
// 				headers: { Authorization: `Bearer ${token}` }
// 			});

// 			if (!response.ok) throw new Error("Invalid token");

// 			const user = await response.json();
// 			return user;
// 		} catch (error) {
// 			return rejectWithValue(error);
// 		}
// 	}
// );
