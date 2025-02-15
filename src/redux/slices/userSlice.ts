// import { getUserInfo } from "@/redux/slices/userSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	fetchUserInfo
	// getUserInfo
} from "../actions/userActions";

interface UserInfo {
	id: number;
	username: string;
	email: string;
	password: string;
	avatar: string;
}

interface UserState {
	userInfo: UserInfo | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	userInfo: null,
	loading: false,
	error: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo: (state, action: PayloadAction<UserInfo>) => {
			state.userInfo = action.payload;
		},
		clearUserInfo: state => {
			state.userInfo = null;
		},
		getUserInfo: (state, action: PayloadAction<UserInfo>) => {
			state.userInfo = action.payload;
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
				state.userInfo = action.payload;
			})
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
		// .addCase(fetchUser.pending, state => {
		// 	state.loading = true;
		// 	state.error = null;
		// })
		// .addCase(fetchUser.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.userInfo = action.payload;
		// })
		// .addCase(fetchUser.rejected, state => {
		// 	state.loading = false;
		// 	// state.error = action.payload;
		// });
	}
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
