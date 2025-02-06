import mountains from "../../public/images/mountains.png";

export const currentUser = {
	avatar:
		"https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65217851c5f9593e3c4053c7_65217868c5f9593e3c4067d0/scale_1200",
	name: "Joe Peach",
	tag: "johndoe",
	summary: "This is a summary about me",
	followers: 100,
	following: 50,
	aboutMe: "I'm a traveler and a photographer"
};

export const currentPost = {
	author: "John Doe",
	date: "2023-01-01",
	placeLocation: "New York",
	description: "Mountains",
	image: "/images/mountains.png"
};

export const userPosts = [
	{
		image: mountains,
		description:
			"Lorem #dasasd ipsum dolor sit amet consectetur, adipisicing elit. Sunt illum, dolore ipsam saepe reprehenderit fuga natus quam. Odit eos voluptates aliquid ea facilis minus. Est quos labore et soluta dolore.",
		author: "John Doe",
		date: "June 15, 2022",
		likes: ["johndoe"],
		placeLocation: "Mountains"
	}
];

// export const startMainPosts: PostData[] = [
// 	{
// 		image: mountains,
// 		description:
// 			"Lorem #dasasd ipsum dolor sit amet consectetur, adipisicing elit. Sunt illum, dolore ipsam saepe reprehenderit fuga natus quam. Odit eos voluptates aliquid ea facilis minus. Est quos labore et soluta dolore.",
// 		author: "John Doe",
// 		date: "June 15, 2022",
// 		likes: ["johndoe"],
// 		placeLocation: "Mountains"
// 	},
// 	{
// 		image: mountains,
// 		description: "Mountains",
// 		author: "John Doe",
// 		date: "June 15, 2022",
// 		likes: ["asdsadsadsad", "johndoe", "asdasc"],
// 		placeLocation: "Mountains"
// 	},
// 	{
// 		image: mountains,
// 		description: "Mountains",
// 		author: "John Doe",
// 		date: "June 15, 2022",
// 		likes: ["asdsadsadsad", "sadsad", "asdasc"],
// 		placeLocation: "Mountains"
// 	}
// ];

// export const startUserPosts: PostData[] = [
// 	{
// 		image: mountains,
// 		description: "mooooooon",
// 		author: "John Doe",
// 		date: "June 15, 2022",
// 		likes: ["johndoe", "sadsad", "asdasc"],
// 		placeLocation: "Mountains"
// 	},
// 	{
// 		image: mountains,
// 		description: "Mountains",
// 		author: "John Doe",
// 		date: "June 15, 2022",
// 		likes: ["asdsadsadsad", "sadsad", "asdasc"],
// 		placeLocation: "Mountains"
// 	}
// ];

// export const startUsers: UserData[] = [
// 	{
// 		name: "name",
// 		email: "email@email.com",
// 		password: "password",
// 		summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
// 		avatar: mountains,
// 		followers: 100,
// 		following: 50,
// 		aboutMe: "I'm a software developer.",
// 		tag: "johndoe"
// 	}
// ];

// export const startUser: UserData = {
// 	name: "admin",
// 	email: "IzT9u@example.com",
// 	password: "password",
// 	summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
// 	avatar: mountains,
// 	followers: 100,
// 	following: 50,
// 	aboutMe: "I'm a software developer.",
// 	tag: "johndoe"
// };
