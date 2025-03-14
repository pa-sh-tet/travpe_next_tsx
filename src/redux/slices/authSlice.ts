import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../actions/authActions";

interface UserData {
	id: number;
	username: string;
	email: string;
	avatar?: string;
	token: string;
}

interface AuthState {
	loading: boolean;
	userToken: string | null;
	error: string | null;
	success: boolean;
}

const initialState: AuthState = {
	loading: false,
	userToken: null,
	// userToken: localStorage.getItem("userToken") || null,
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
			state.loading = false;
			state.error = null;
		},
		setUserToken: (state, action: PayloadAction<string>) => {
			state.userToken = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			// Регистрация
			.addCase(registerUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, state => {
				state.loading = false;
				state.success = true;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Авторизация
			.addCase(loginUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				loginUser.fulfilled,
				(state, action: PayloadAction<UserData>) => {
					state.loading = false;
					state.userToken = action.payload.token;
					localStorage.setItem("userToken", action.payload.token);
					state.error = null;
				}
			)
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	}
});

export const { logoutUser, setUserToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
