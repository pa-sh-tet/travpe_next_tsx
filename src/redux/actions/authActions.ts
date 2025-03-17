import { api_url } from "@/utils/api";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `${api_url}/auth`;

interface RegisterData {
	username: string;
	email: string;
	password: string;
	avatar?: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface UserData {
	id: number;
	username: string;
	email: string;
	avatar?: string;
	token: string;
}

export const registerUser = createAsyncThunk<UserData, RegisterData>(
	"auth/register",
	async ({ username, email, password, avatar }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};

			const { data } = await axios.post<UserData>(
				`${API_URL}/register`,
				{ username, email, password, avatar },
				config
			);

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const loginUser = createAsyncThunk<UserData, LoginData>(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};

			const { data } = await axios.post<UserData>(
				`${API_URL}/login`,
				{ email, password },
				config
			);

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
