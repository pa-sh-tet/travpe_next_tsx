import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/auth";

interface RegisterData {
	username: string;
	email: string;
	password: string;
}

interface LoginData {
	email: string;
	password: string;
}

export const registerUser = createAsyncThunk<void, RegisterData>(
	"auth/register",
	async ({ username, email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};
			await axios.post(
				`${API_URL}/register`,
				{ username, email, password },
				config
			);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const loginUser = createAsyncThunk<void, LoginData>(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};
			const { data } = await axios.post(
				`${API_URL}/login`,
				{ email, password },
				config
			);
			localStorage.setItem("userToken", data.token);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const logoutUser = createAsyncThunk<void, void>(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await axios.post(`${API_URL}/logout`);
			localStorage.removeItem("userToken");
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
