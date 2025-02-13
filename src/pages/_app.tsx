"use client";

import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/redux/slices/authSlice";

function AppContent({ Component, pageProps, router }: AppProps) {
	const dispatch = useDispatch();

	useEffect(() => {
		// if (typeof window !== "undefined") {
		const token = localStorage.getItem("userToken");
		dispatch(setUserToken(token));
		// }
	}, [dispatch]);

	return <Component {...pageProps} router={router} />;
}

export default function App({ Component, pageProps, router }: AppProps) {
	return (
		<Provider store={store}>
			<AppContent Component={Component} pageProps={pageProps} router={router} />
		</Provider>
	);
}
