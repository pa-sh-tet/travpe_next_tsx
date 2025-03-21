import { useEffect } from "react";
import styles from "@/styles/Popup.module.scss";

interface Props {
	latitude: number;
	longitude: number;
}

const yandex_map_api_key = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

const YandexMap: React.FC<Props> = ({ latitude, longitude }) => {
	useEffect(() => {
		const loadMap = () => {
			if (!window.ymaps) return; // Проверяем, загружена ли библиотека

			window.ymaps.ready(() => {
				const map = new window.ymaps.Map("map", {
					center: [latitude, longitude],
					zoom: 12
				});

				const placemark = new window.ymaps.Placemark([latitude, longitude], {
					hintContent: "Выбранное место",
					balloonContent: "Информация о месте"
				});

				map.geoObjects.add(placemark);
			});
		};

		if (typeof window !== "undefined" && window.ymaps) {
			loadMap();
		} else {
			const script = document.createElement("script");
			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yandex_map_api_key}&lang=en_RU`;
			script.async = true;
			script.onload = () => loadMap();
			document.head.appendChild(script);
		}
	}, [latitude, longitude]);

	return <div className={styles.popup__map} id="map" />;
};

export default YandexMap;
