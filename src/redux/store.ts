import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import { postReducer } from "@/redux/slices/postSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postReducer
	},
	devTools: true
});

// Типизация `RootState` и `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
