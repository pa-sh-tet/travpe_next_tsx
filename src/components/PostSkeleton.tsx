import styles from "@/styles/Post.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useRouter } from "next/router";

export default function PostSkeleton() {
	const router = useRouter();

	return router.pathname === "/" ? (
		<div className={styles.post}>
			<Skeleton height={350} />
			<div className={styles.post__container}>
				<Skeleton height={44} />
				<div className={styles.post__info}>
					<div className={styles.post__about}>
						<Skeleton height={16} width={100} />
						<Skeleton height={14} width={80} />
					</div>
					<div className={styles.post__like}>
						<Skeleton height={14} width={30} />
						<Skeleton height={20} width={20} />
					</div>
				</div>
			</div>
		</div>
	) : (
		<li className={styles["profile__post"]}>
			<Skeleton height={200} />
			<div className={styles["profile__post-container"]}>
				<Skeleton height={20} />
				<div className={styles["profile__post-info"]}>
					<Skeleton height={13} width={100} />
					<div className={styles["profile__post-like"]}>
						<Skeleton height={20} width={20} />
					</div>
				</div>
			</div>
		</li>
	);
}
