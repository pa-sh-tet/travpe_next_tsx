/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO : Разобраться с типами
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../actions/authActions";

interface AuthState {
	loading: boolean;
	userToken: string | null;
	// userId: number | null;
	error: string | null; // Или более конкретный тип, если возможно
	success: boolean;
}

const initialState: AuthState = {
	loading: false,
	userToken: null,
	// userId: null,
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
			// state.userId = null;
			state.loading = false;
			state.error = null;
		},
		setUserToken: (state, action: PayloadAction<any>) => {
			state.userToken = action.payload;
		},
		getToken: state => {
			if (localStorage.getItem("userToken")) {
				state.userToken = localStorage.getItem("userToken");
			} else {
				state.userToken = null;
			}
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
				state.userToken = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});

export const { logoutUser, setUserToken, getToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
