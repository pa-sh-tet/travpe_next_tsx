import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from "../actions/userActions";
import { IUser } from "@/types/User";

interface UserState {
	user: IUser | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearUserInfo: state => {
			state.user = null;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUserInfo.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	}
});

export const { clearUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
