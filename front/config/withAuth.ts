import Router from "next/router";

export async function withAuth(): Promise<boolean> {
	const accessToken = await localStorage.getItem("token-api");
	if (!accessToken) {
		Router.replace("/");
		return false;
	} return true;
};

