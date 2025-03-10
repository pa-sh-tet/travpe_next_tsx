"use client";

import Link from "next/link";
import styles from "@/styles/Login.module.scss";
import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/actions/authActions";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
	isUsernameAvailable,
	isEmailAvailable
} from "@/redux/actions/userActions";
import { isValidUrl } from "@/utils/functions";

function Login() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [avatarError, setAvatarError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [registerError, setRegisterError] = useState("");

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();
	const { loading, userToken } = useSelector((state: RootState) => state.auth);
	const router = useRouter();

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();
		let isValid = true;

		setUsernameError("");
		setEmailError("");
		setPasswordError("");

		if (!username) {
			setUsernameError("Name is required");
			isValid = false;
		} else if (username.length < 2 || username.length > 40) {
			setUsernameError("Name must be between 2 and 40 characters");
			isValid = false;
		} else {
			const available = await dispatch(isUsernameAvailable(username)).unwrap();
			if (!available) {
				setUsernameError("This name is already taken");
				isValid = false;
			}
		}

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
			const available = await dispatch(isEmailAvailable(email)).unwrap();
			if (!available) {
				setEmailError("This email has already been registered");
				isValid = false;
			}
		}

		if (avatar) {
			if (avatar.length < 4) {
				setAvatarError("Avatar must be at least 4 characters");
				isValid = false;
			} else if (!isValidUrl(avatar)) {
				setAvatarError("Avatar must be a valid URL");
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
			await dispatch(registerUser({ username, email, password, avatar }));
			router.push("/login");
		} catch (error) {
			setRegisterError("Registration failed");
			console.error("Ошибка при регистрации:", error);
		}
	};

	useEffect(() => {
		if (userToken !== null) {
			router.push("/");
		}
	}, [router, userToken]);

	if (userToken !== null) {
		return null;
	}

	return (
		<>
			<section className={styles.login}>
				<div className={styles.login__container}>
					<Link className={styles["login__logo-link"]} href="/" />
					<h2 className={styles.login__title}>Welcome!</h2>
					<form
						className={styles.login__form}
						onSubmit={handleRegister}
						noValidate
					>
						<div className={styles["login__form-item"]}>
							<label htmlFor="name" className={styles.login__label}>
								Name
							</label>
							<input
								className={styles.login__input}
								placeholder="Enter your name"
								name="name"
								id="name"
								type="name"
								minLength={2}
								maxLength={40}
								onChange={e => setUsername(e.target.value)}
								required
								autoComplete="name"
							/>
							{usernameError && (
								<span className={styles.login__error}>{usernameError}</span>
							)}
						</div>
						<div className={styles["login__form-item"]}>
							<label htmlFor="email" className={styles.login__label}>
								Email
							</label>
							<input
								className={styles.login__input}
								placeholder="Enter your email"
								name="email"
								id="email"
								type="email"
								minLength={2}
								onChange={e => setEmail(e.target.value)}
								required
								autoComplete="email"
							/>
							{emailError && (
								<span className={styles.login__error}>{emailError}</span>
							)}
						</div>
						<div className={styles["login__form-item"]}>
							<label htmlFor="avatar" className={styles.login__label}>
								Avatar* (optionally)
							</label>
							<input
								placeholder="Enter your avatar URL"
								className={styles.login__input}
								name="avatar"
								id="avatar"
								type="url"
								onChange={e => setAvatar(e.target.value)}
								autoComplete="avatar"
							/>
							{avatarError && (
								<span className={styles.login__error}>{avatarError}</span>
							)}
						</div>
						<div className={styles["login__form-item"]}>
							<label htmlFor="password" className={styles.login__label}>
								Password
							</label>
							<input
								className={styles.login__input}
								placeholder="Enter your password"
								name="password"
								id="password"
								type="password"
								minLength={2}
								maxLength={40}
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
							{loading ? <div className={styles.loader}></div> : "Sign up"}
						</button>
						<span className={styles.login__error}>{registerError}</span>
						<p className={styles.login__text}>Forgot your password?</p>
					</form>
					<p className={styles.login__register}>
						Already have an account?
						<Link className={styles.login__link} href="/login">
							Sign in
						</Link>
					</p>
				</div>
			</section>
		</>
	);
}

export default Login;
