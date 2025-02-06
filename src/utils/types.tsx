export interface PostData {
	image: File | null | string;
	description: string;
	author: string;
	date: string;
	likes: string[];
	placeLocation: string;
}

export interface UserData {
	name: string;
	email: string;
	password: string;
	summary: string;
	avatar: string;
	followers: number;
	following: number;
	aboutMe: string;
	tag: string;
}
