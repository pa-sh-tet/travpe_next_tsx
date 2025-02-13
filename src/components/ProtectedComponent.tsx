import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
	children?: ReactNode; // Добавляем children, если компонент принимает дочерние элементы
	[key: string]: unknown; // Разрешаем передачу любых других пропсов
}

const protectedComponent = <P extends Props>(
	WrappedComponent: React.ComponentType<P>
) => {
	const ProtectedComponent = (props: P) => {
		const { userToken } = useSelector((state: RootState) => state.auth);
		const router = useRouter();

		useEffect(() => {
			if (!userToken) {
				router.push("/signin");
			}
		}, [userToken, router]);

		// Если токен есть, рендерим компонент, иначе ничего не рендерим (или можно показать сообщение "Loading...")
		return userToken ? <WrappedComponent {...props} /> : null;
	};

	return ProtectedComponent;
};

export default protectedComponent;
