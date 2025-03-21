"use client";

import "@/styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/redux/slices/authSlice";
import { kanit, pacifico, poppins, roboto } from "@/utils/fonts";
import { jwtDecode } from "jwt-decode";
const yandex_map_api_key = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

interface DecodedToken {
	exp: number;
	userId: number;
}

// Проверка, истек ли токен
const isTokenValid = (token: string): boolean => {
	try {
		const decoded = jwtDecode<DecodedToken>(token);
		return decoded.exp * 1000 > Date.now();
	} catch (error) {
		console.error("Error decoding token:", error);
		return false;
	}
};

function AppContent({ Component, pageProps, router }: AppProps) {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("userToken");
		if (token && isTokenValid(token)) {
			dispatch(setUserToken(token));
		} else {
			dispatch(setUserToken(null));
			localStorage.removeItem("userToken");
			router.push("/login");
		}
	}, [dispatch, router]);

	return <Component {...pageProps} router={router} />;
}

export default function App({ Component, pageProps, router }: AppProps) {
	return (
		<Provider store={store}>
			<Head>
				<link rel="icon" type="image/png" href="/favicon.png" />
				{/* eslint-disable-next-line @next/next/no-sync-scripts*/}
				<script
					src={`https://api-maps.yandex.ru/2.1/?apikey=${yandex_map_api_key}&lang=en_RU`}
					type="text/javascript"
				></script>
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
