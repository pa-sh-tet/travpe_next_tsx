// import { userPosts } from "@/data/data";
import { createSlice } from "@reduxjs/toolkit";
import {
	loginUser,
	registerUser,
	logoutUser,
	checkAuth
} from "../thunks/authThunks";

export 

const initialState = {
	user: null,
	token: null,
	status: "idle",
	error: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// setAuthState: (state, action) => {
			
		// }
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = "succeded";
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeded";
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(logoutUser.fulfilled, state => {
				state.status = "idle";
				state.user = null;
				state.token = null;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.status = "succeded";
				state.user = action.payload.user;
			});
	}
});

// export 
export default authSlice.reducer;
