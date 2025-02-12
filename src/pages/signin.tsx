"use client";

import Link from "next/link";
import styles from "@/styles/Signin.module.scss";
import Header from "@/components/Header";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/actions";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	const handleLogin = () => {
		dispatch(loginUser({ email, password }));
	};

	return (
		<>
			<Header />
			<section className={styles.login}>
				<div className={styles.login__container}>
					<Link className={styles["login__logo-link"]} href="/" />
					<h2 className={styles.login__title}>Welcome back</h2>
					{/* <GoogleButton></GoogleButton> */}
					<form className={styles.login__form} onSubmit={handleLogin}>
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
								required
							/>
						</div>
						<button className={styles.login__button} type="submit">
							Sign in
						</button>
						<p className={styles.login__text}>Forgot your password?</p>
					</form>
					<p className={styles.login__register}>
						{/* Don't have an account? */}
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

// const router = useRouter();

// const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
// 	event.preventDefault();

// 	const formData = new FormData(event.currentTarget);

// 	const res = await signIn("credentials", {
// 		email: formData.get("email"),
// 		password: formData.get("password"),
// 		redirect: false
// 	});

// 	if (res && !res.error) {
// 		router.push("/profile");
// 	} else {
// 		console.log(res);
// 	}
// };
