"use client";

import "@/styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/redux/slices/authSlice";
import { kanit, pacifico, poppins, roboto } from "@/styles/fonts";

function AppContent({ Component, pageProps, router }: AppProps) {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("userToken");
		dispatch(setUserToken(token));
	}, [dispatch]);

	return <Component {...pageProps} router={router} />;
}

export default function App({ Component, pageProps, router }: AppProps) {
	return (
		<Provider store={store}>
			<Head>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>
			<main
				className={`${poppins.variable} ${pacifico.variable} ${kanit.variable} ${roboto.variable}`}
			>
				<AppContent
					Component={Component}
					pageProps={pageProps}
					router={router}
				/>
			</main>
		</Provider>
	);
}
