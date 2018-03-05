import { AUTH_LOAD_TOKEN, AUTH_LOGIN, AUTH_LOGOUT } from "./actions";

export function token(state = null, action) {
	switch (action.type) {
		case AUTH_LOAD_TOKEN:
		case AUTH_LOGIN:
			localStorage.setItem("token", action.token);
			return action.token;
		case AUTH_LOGOUT:
			localStorage.setItem("token", null);
			return null;
	}
	return state;
}

export function userId(state = null, action) {
	switch (action.type) {
		case AUTH_LOAD_TOKEN:
		case AUTH_LOGIN:
			if (action.token) {
				try {
					let jsonString = atob(action.token.split(".")[1]);
					return JSON.parse(jsonString).userId || null;
				} catch (err) {
					return null;
				}
			}
			return null;
		case AUTH_LOGOUT:
			return null;
	}
	return state;
}
