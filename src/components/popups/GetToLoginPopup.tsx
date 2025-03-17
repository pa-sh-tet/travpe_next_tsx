import { closeGetToLoginPopup } from "@/redux/slices/popupSlice";
import PopupWithForm from "./PopupWithForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function GetToLoginPopup() {
	const dispatch = useDispatch<AppDispatch>();

	const { isGetToLoginPopupOpen }: { isGetToLoginPopupOpen: boolean } =
		useSelector((state: RootState) => state.popup);

	const router = useRouter();

	const handleGetToLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		router.push("/login");

		dispatch(closeGetToLoginPopup());
	};

	return (
		<PopupWithForm
			name="getToLogin"
			title="You are not logged in!"
			status={"succeded"}
			buttonText="Login"
			isOpen={isGetToLoginPopupOpen}
			onSubmit={handleGetToLogin}
			onClose={() => dispatch(closeGetToLoginPopup())}
		>
			<p>This action is only available to authorized users.</p>
		</PopupWithForm>
	);
}

export default GetToLoginPopup;
