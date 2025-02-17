export interface IPost {
	id: string;
	content: string;
	image?: string;
	userId: number;
	user: {
		id: number;
		username: string;
		avatar: string;
	};
	createdAt: string;
}

// export interface IPost {
// 	id: string;
// 	content: string;
// 	image?: string;
// 	userId: number;
// 	createdAt: string;
// }
