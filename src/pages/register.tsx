"use client";

import Link from "next/link";
import styles from "@/styles/Login.module.scss";
import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/actions/authActions";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function Login() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();
	const { loading } = useSelector((state: RootState) => state.auth);
	const router = useRouter();

	const handleRegister = (e: FormEvent) => {
		e.preventDefault();
		dispatch(registerUser({ username, email, password }));
		router.push("/login");
	};

	return (
		<>
			{/* <Header /> */}
			<section className={styles.login}>
				<div className={styles.login__container}>
					<Link className={styles["login__logo-link"]} href="/" />
					<h2 className={styles.login__title}>Welcome!</h2>
					<form className={styles.login__form} onSubmit={handleRegister}>
						<div className={styles["login__form-item"]}>
							<label htmlFor="name" className={styles.login__label}>
								Name
							</label>
							<input
								className={styles.login__input}
								name="name"
								id="name"
								type="name"
								onChange={e => setUsername(e.target.value)}
								required
								autoComplete="name"
							/>
						</div>
						<div className={styles["login__form-item"]}>
							<label htmlFor="email" className={styles.login__label}>
								Email
							</label>
							<input
								className={styles.login__input}
								name="email"
								id="email"
								type="email"
								onChange={e => setEmail(e.target.value)}
								required
								autoComplete="email"
							/>
						</div>
						<div className={styles["login__form-item"]}>
							<label htmlFor="password" className={styles.login__label}>
								Password
							</label>
							<input
								className={styles.login__input}
								name="password"
								id="password"
								type="password"
								onChange={e => setPassword(e.target.value)}
								autoComplete="current-password"
								required
							/>
						</div>
						<button
							className={styles.login__button}
							type="submit"
							disabled={loading}
						>
							{loading ? "loading..." : "Sign up"}
						</button>
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
