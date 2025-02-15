// import mountains from "../../public/images/mountains.png";

export const currentUser = {
	id: 1,
	avatar:
		"https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65217851c5f9593e3c4053c7_65217868c5f9593e3c4067d0/scale_1200",
	username: "Joe Peach",
	email: "email@example.com",
	password: "password",
	createdAt: "",
	posts: [],
	likes: []
};

export const currentPost = {
	id: 1,
	user: "John Doe",
	location: "New York",
	content: "Mountains",
	image:
		"https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65217851c5f9593e3c4053c7_65217868c5f9593e3c4067d0/scale_1200",
	likes: [],
	createdAt: "2023-01-01"

	// userId    Int
	// user      User     @relation(fields: [userId], references: [id])
};

export const userPosts = [
	{
		image: "",
		description:
			"Lorem #dasasd ipsum dolor sit amet consectetur, adipisicing elit. Sunt illum, dolore ipsam saepe reprehenderit fuga natus quam. Odit eos voluptates aliquid ea facilis minus. Est quos labore et soluta dolore.",
		author: "John Doe",
		date: "June 15, 2022",
		likes: ["johndoe"],
		placeLocation: "Mountains"
	}
];
