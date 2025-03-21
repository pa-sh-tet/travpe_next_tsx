import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	fetchUserById,
	fetchUserInfo,
	updateUser
} from "../actions/userActions";
import { IUser } from "@/interfaces/User";

interface UserState {
	user: IUser | null;
	profileUser: IUser | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	profileUser: null,
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
			.addCase(
				fetchUserInfo.fulfilled,
				(state, action: PayloadAction<IUser>) => {
					state.loading = false;
					state.user = action.payload;
				}
			)
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchUserById.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchUserById.fulfilled,
				(state, action: PayloadAction<IUser>) => {
					state.loading = false;
					state.profileUser = action.payload;
				}
			)
			.addCase(fetchUserById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	}
});

export const { clearUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
