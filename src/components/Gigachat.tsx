import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchGigaPlace } from "@/redux/actions/gptAction";
import { resetPlace } from "@/redux/slices/gptSlice";
import styles from "@/styles/Gpt.module.scss";

export const GigaChatButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { place, loading, error } = useSelector(
		(state: RootState) => state.gpt
	);

	const handleClick = () => {
		dispatch(fetchGigaPlace());
	};

	const handleReset = () => {
		dispatch(resetPlace());
	};

	return (
		<div className={styles.gpt}>
			<button
				onClick={handleClick}
				className={styles.gpt__button}
				disabled={loading}
			>
				{loading ? "Загрузка..." : "Предложить место в России"}
			</button>

			{place && (
				<div className={styles.gpt__result}>
					<h3>Результат:</h3>
					<p>{place}</p>
					<button onClick={handleReset} className={styles.gpt__result__reset}>
						Очистить
					</button>
				</div>
			)}

			{error && <div className={styles.gpt__error}>{error}</div>}
		</div>
	);
};
