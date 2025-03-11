import { Pacifico, Poppins, Kanit, Roboto } from "next/font/google";

export const pacifico = Pacifico({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-pacifico"
});

export const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-poppins"
});

export const kanit = Kanit({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-kanit"
});

export const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	variable: "--font-roboto"
});
