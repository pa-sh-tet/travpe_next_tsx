import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "@/utils/api";

const API_URL = `${api_url}/gpt`;

export const fetchGigaPlace = createAsyncThunk(
	"gpt/fetchPlace",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(`${API_URL}/places`);
			return response.data.place;
		} catch (error) {
			console.error(error);
			return thunkAPI.rejectWithValue("Ошибка при загрузке данных из GigaChat");
		}
	}
);
