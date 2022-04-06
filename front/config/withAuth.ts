import Router from "next/router";

export const withAuth = async () => {
	const accessToken = await localStorage.getItem("token-api");
	if (!accessToken) {
		Router.replace("/");
		return false;
	} return true;
};

