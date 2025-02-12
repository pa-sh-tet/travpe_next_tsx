import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	user: { id: string; username: string; email: string } | null;
	isAuthenticated: boolean;
}

const initialState: UserState = {
	user: null,
	isAuthenticated: false
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState["user"]>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
		},
		logout: state => {
			state.user = null;
			state.isAuthenticated = false;
		}
	}
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
