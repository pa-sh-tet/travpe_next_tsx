import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
		setUserInfo: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		clearUserInfo: state => {
			state.user = null;
		},
		getUserInfo: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
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
