import { API_HOST } from '../../constants/server';

const options = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
};

export const login = async (loginDetails) => {
	try {
		const data = await fetch(`${API_HOST}/auth/login`, {
			...options,
			body: JSON.stringify(loginDetails)
		});
		const response = await data.json();
		if (response.success) {
			return response;
		} else {
			return response;
		}
	} catch (e) {
		return e;
	}
};
