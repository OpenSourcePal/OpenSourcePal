const BASE_URL = 'https://api.github.com/';

export const getUser = async (authToken) => {
	const response = await fetch(BASE_URL + 'user', {
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${authToken}`,
		},
	});

	const data = await response.json();
	return data;
};
