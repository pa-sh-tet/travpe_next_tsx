export interface IPost {
	id: number;
	content: string;
	image: string;
	userId: number;
	user: {
		id: number;
		username: string;
		avatar: string;
	};
	createdAt: string;
}
