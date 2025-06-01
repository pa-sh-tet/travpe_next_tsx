import { fetchGigaPlace } from "./../actions/gptAction";
import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
	name: "gpt",
	initialState: {
		place: "",
		loading: false,
		error: null as string | null
	},
	reducers: {
		resetPlace: state => {
			state.place = "";
			state.error = null;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGigaPlace.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGigaPlace.fulfilled, (state, action) => {
				state.place = action.payload;
				state.loading = false;
			})
			.addCase(fetchGigaPlace.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	}
});

export const { resetPlace } = gptSlice.actions;
export const gptReducer = gptSlice.reducer;
