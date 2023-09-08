import { error, info } from './helper';

const BASE_URL = 'https://api.github.com';

export const getUserInfo = async (accessToken: string) => {
	try {
		const response = await fetch(`${BASE_URL}/user`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const userData = await response.json();
		return userData;
	} catch (error) {
		console.error('Error fetching user data:', error);
		return null;
	}
};

export async function sendUserToServer(userData: UserInfoType) {
	info('userData', userData);

	const response = await fetch(`${process.env.SeverURL}/api/user/addUser`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});

	const data = await response.json();
	console.log(data);
	if (response.ok) {
		console.log('Added Successfully');
	} else {
		error(`couldn't add users`, data.message);
	}
}
