import { api_url } from "@/api";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `${api_url}/auth`;

interface RegisterData {
	username: string;
	email: string;
	password: string;
	avatar: string | null;
}

interface LoginData {
	email: string;
	password: string;
}

export const registerUser = createAsyncThunk<void, RegisterData>(
	"auth/register",
	async ({ username, email, password, avatar }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};
			await axios.post(
				`${API_URL}/register`,
				{ username, email, password, avatar },
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.response && error.response.data.error) {
				return rejectWithValue(error.response.data.error);
			}
			return rejectWithValue("Ошибка при авторизации");
		}
	}
);
