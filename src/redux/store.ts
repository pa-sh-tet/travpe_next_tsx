import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/slices/authSlice";
import { postReducer } from "@/redux/slices/postSlice";
import { userReducer } from "@/redux/slices/userSlice";
import { popupReduser } from "./slices/popupSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postReducer,
		user: userReducer,
		popup: popupReduser
	},
	devTools: true
});

// Типизация `RootState` и `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
