
import { Authenticator } from "remix-auth";
import { createCookieSessionStorage } from "react-router";

// Define your user type
type User = {
	id: string;
	email: string;
	name: string;
};

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [process.env.SECRET_KEY!],
		secure: process.env.NODE_ENV === "production",
	},
});

export const authenticator = new Authenticator<User>();
