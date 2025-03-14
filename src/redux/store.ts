import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/slices/authSlice";
import { postReducer } from "@/redux/slices/postSlice";
import { likesReducer } from "@/redux/slices/likeSlice";
import { userReducer } from "@/redux/slices/userSlice";
import { popupReduser } from "./slices/popupSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postReducer,
		likes: likesReducer,
		user: userReducer,
		popup: popupReduser
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
