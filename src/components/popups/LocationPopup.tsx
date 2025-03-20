import styles from "@/styles/Popup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { AppDispatch, RootState } from "@/redux/store";
import { closeLocationPopup } from "@/redux/slices/popupSlice";
import { IPost } from "@/interfaces/Post";
// import PostSkeleton from "../PostSkeleton";
import YandexMap from "../YandexMap";
import Skeleton from "react-loading-skeleton";

export default function LocationPopup() {
	const dispatch = useDispatch<AppDispatch>();

	const {
		statusPostById,
		postDataById
	}: {
		statusPostById: string;
		postDataById: IPost | null;
	} = useSelector((state: RootState) => state.posts);

	const {
		isLocationPopupOpen
	}: {
		isLocationPopupOpen: boolean;
		postIdToOpen: number | null;
	} = useSelector((state: RootState) => state.popup);

	if (
		!postDataById ||
		!isLocationPopupOpen ||
		!postDataById.latitude ||
		!postDataById.longitude
	)
		return;

	const handleClose = () => {
		dispatch(closeLocationPopup());
	};

	return (
		<Popup isOpen={isLocationPopupOpen} onClose={handleClose}>
			<div
				className={`${styles.popup__container} ${styles["popup__container-location"]}`}
			>
				{statusPostById === "loading" ? (
					<Skeleton width={700} height={450} />
				) : (
					<>
						<YandexMap
							latitude={postDataById.latitude}
							longitude={postDataById.longitude}
						/>
						<p className={` ${styles["popup__container-location-text"]}`}>
							{postDataById.location}
						</p>
					</>
				)}
			</div>
		</Popup>
	);
}
