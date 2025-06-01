import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGigaPlace = createAsyncThunk(
	"gpt/fetchPlace",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get("http://localhost:5000/api/gpt/places");
			return response.data.place;
		} catch (error) {
			console.error(error);
			return thunkAPI.rejectWithValue("Ошибка при загрузке данных из GigaChat");
		}
	}
);
