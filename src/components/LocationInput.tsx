import React, { useEffect, useState } from "react";
import styles from "@/styles/Popup.module.scss";

interface Place {
	name: string;
	fullName: string;
	coordinates: [number, number]; // [latitude, longitude]
}

interface Props {
	value?: string;
	onSelect: (place: Place) => void;
}

const LocationInput: React.FC<Props> = ({ value, onSelect }) => {
	const [query, setQuery] = useState<string>(value || "");

	const [suggestions, setSuggestions] = useState<Place[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setQuery(value || "");
	}, [value]);

	// Функция для запроса в Геокодер
	const fetchSuggestions = async (address: string) => {
		if (!address) {
			setSuggestions([]);
			setIsOpen(false);
			return;
		}

		const response = await fetch(
			`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&format=json&geocode=${address}&lang=en_RU`
		);
		const data = await response.json();

		// Преобразуем полученные данные в удобный формат
		const results: Place[] =
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data.response.GeoObjectCollection.featureMember.map((item: any) => ({
				name: item.GeoObject.name,
				fullName: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
				coordinates: item.GeoObject.Point.pos.split(" ").map(Number).reverse() // [lat, lng]
			}));

		setSuggestions(results);
		setIsOpen(results.length > 0);
	};

	// Обработчик выбора локации
	const handleSelect = (place: Place) => {
		setQuery(place.fullName);
		setSuggestions([]);
		setIsOpen(false);
		onSelect(place);
	};

	// Обработка изменения текста
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		fetchSuggestions(e.target.value); // Запрос на каждый ввод
	};

	return (
		<>
			<input
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder="Location"
				autoComplete="off"
				className={styles.popup__input}
			/>

			{isOpen && (
				<ul className={styles["popup__location-list"]}>
					{suggestions.slice(0, 5).map((place, index) => (
						<li
							key={index}
							onClick={() => handleSelect(place)}
							className={styles["popup__location-item"]}
						>
							{place.fullName}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default LocationInput;
