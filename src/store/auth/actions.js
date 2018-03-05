export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_LOAD_TOKEN = "AUTH_LOAD_TOKEN";

export const loadToken = () => ({
	type: AUTH_LOAD_TOKEN,
	token: localStorage.getItem("token")
});

export const login = token => ({
	type: AUTH_LOGIN,
	token
});

export const logout = () => ({
	type: AUTH_LOGOUT
});
