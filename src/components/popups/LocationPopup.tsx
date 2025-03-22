import styles from "@/styles/Popup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { AppDispatch, RootState } from "@/redux/store";
import { closeLocationPopup } from "@/redux/slices/popupSlice";
import { IPost } from "@/interfaces/Post";
import YandexMap from "../YandexMap";
// import Skeleton from "react-loading-skeleton";

export default function LocationPopup() {
	const dispatch = useDispatch<AppDispatch>();
	const {
		isLocationPopupOpen,
		selectedLocation
	}: {
		isLocationPopupOpen: boolean;
		selectedLocation: IPost | null;
	} = useSelector((state: RootState) => state.popup);

	if (
		!isLocationPopupOpen ||
		!selectedLocation ||
		selectedLocation.latitude === undefined ||
		selectedLocation.longitude === undefined
	) {
		return null;
	}

	const handleClose = () => {
		dispatch(closeLocationPopup());
	};

	return (
		<Popup isOpen={isLocationPopupOpen} onClose={handleClose}>
			<div
				className={`${styles.popup__container} ${styles["popup__container-location"]}`}
			>
				{/* {statusPostById === "loading" ? (
					<Skeleton width={700} height={450} />
				) : ( */}
				<>
					<YandexMap
						latitude={selectedLocation.latitude}
						longitude={selectedLocation.longitude}
					/>
					<p className={` ${styles["popup__container-location-text"]}`}>
						{selectedLocation.location}
					</p>
				</>
				{/* )} */}
			</div>
		</Popup>
	);
}
