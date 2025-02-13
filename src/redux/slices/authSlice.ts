/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO : Разобраться с типами
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../actions/authActions";

interface AuthState {
	loading: boolean;
	userInfo: object;
	userToken: string | null;
	error: string | null; // Или более конкретный тип, если возможно
	success: boolean;
}

// const userToken =
// 	typeof window !== "undefined"
// 		? localStorage.getItem("userToken")
// 			? localStorage.getItem("userToken")
// 			: null
// 		: null;

const initialState: AuthState = {
	loading: false,
	userInfo: {},
	userToken: null,
	error: null,
	success: false
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logoutUser: state => {
			localStorage.removeItem("userToken");
			state.userToken = null;
			state.userInfo = {};
			state.loading = false;
			state.error = null;
		},
		setUserToken: (state, action: PayloadAction<string | null>) => {
			state.userToken = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, state => {
				state.loading = false;
				state.success = true;
			})
			.addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(loginUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.userInfo = action.payload;
				state.userToken = action.payload.userToken;
			})
			.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});

export const { logoutUser, setUserToken } = authSlice.actions;
export default authSlice.reducer;
