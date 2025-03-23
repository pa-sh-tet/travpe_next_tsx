"use client";

import Link from "next/link";
import styles from "@/styles/Login.module.scss";
import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { isEmailAvailable } from "@/redux/actions/userActions";

function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [loginError, setLoginError] = useState<string>("");

	const { loading, userToken }: { loading: boolean; userToken: string | null } =
		useSelector((state: RootState) => state.auth);

	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (userToken !== null) {
			router.push("/");
		}
	}, [router, userToken]);

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let isValid = true;
		setEmailError("");
		setPasswordError("");
		setLoginError("");

		if (!email) {
			setEmailError("Email is required");
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setEmailError("Invalid email format");
			isValid = false;
		} else if (email.length < 2) {
			setEmailError("Email must be at least 2 characters");
			isValid = false;
		} else {
			const available: boolean = await dispatch(
				isEmailAvailable(email)
			).unwrap();
			if (available) {
				setEmailError("There is no user with this email address");
				isValid = false;
			}
		}

		if (!password) {
			setPasswordError("Password is required");
			isValid = false;
		} else if (password.length < 4) {
			setPasswordError("Password must be at least 4 characters");
			isValid = false;
		}

		if (!isValid) return;

		try {
			setLoginError("");
			await dispatch(loginUser({ email, password })).unwrap();
		} catch (error: unknown) {
			if (typeof error === "string") {
				setLoginError(error);
			} else {
				setLoginError("An unknown error occurred");
			}
		}
	};

	return (
		<>
			<section className={styles.login}>
				<div className={styles.login__container}>
					<Link href="/" className={styles.login__main}>
						<div className={styles["login__main-icon"]}></div>
						<p className={styles["login__main-text"]}>Main</p>
					</Link>
					<Link className={styles["login__logo-link"]} href="/" />
					<h2 className={styles.login__title}>Glad to see you!</h2>
					<form
						className={styles.login__form}
						onSubmit={handleLogin}
						noValidate
					>
						<div className={styles["login__form-item"]}>
							<label htmlFor="email" className={styles.login__label}>
								Email
							</label>
							<input
								className={styles.login__input}
								placeholder="Enter your Email"
								name="email"
								id="email"
								type="email"
								onChange={e => setEmail(e.target.value)}
								required
								autoComplete="email"
							/>
							{emailError && (
								<p className={styles.login__error}>{emailError}</p>
							)}
						</div>
						<div className={styles["login__form-item"]}>
							<label htmlFor="password" className={styles.login__label}>
								Password
							</label>
							<input
								className={styles.login__input}
								placeholder="Enter your Password"
								name="password"
								id="password"
								type="password"
								onChange={e => setPassword(e.target.value)}
								autoComplete="current-password"
								required
							/>
							{passwordError && (
								<span className={styles.login__error}>{passwordError}</span>
							)}
						</div>
						<button
							className={styles.login__button}
							type="submit"
							disabled={loading}
						>
							{loading ? <div className={styles.loader}></div> : "SIGN IN"}
						</button>
						{loginError && (
							<span
								style={{ margin: "10px auto 0 auto" }}
								className={styles.login__error}
							>
								{loginError}
							</span>
						)}
						<p className={styles.login__text}>Forgot your password?</p>
					</form>
					<p className={styles.login__register}>
						Don&apos;t have an account?
						<Link className={styles.login__link} href="/register">
							Sign up
						</Link>
					</p>
				</div>
			</section>
		</>
	);
}

export default Login;
