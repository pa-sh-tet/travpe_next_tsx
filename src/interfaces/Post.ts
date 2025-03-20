export interface IPost {
	id: number;
	content: string;
	image: string;
	userId: number;
	location?: string;
	latitude?: number;
	longitude?: number;
	user: {
		id: number;
		username: string;
		avatar: string;
	};
	createdAt: string;
}
