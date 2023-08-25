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
