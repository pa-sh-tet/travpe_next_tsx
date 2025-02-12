import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "@/redux/slices/userSlice";
// import authReducer from "@/redux/slices/authSlice";
import { postReducer } from "@/redux/slices/postSlice";

export const store = configureStore({
	reducer: {
		// auth: authReducer,
		// user: userReducer,
		posts: postReducer
		// likes: likesReducer
	},
	devTools: true
});

// Типизация `RootState` и `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
