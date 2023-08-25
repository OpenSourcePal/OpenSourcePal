import storage from './storage';

export const retrieveAccessToken = async (): Promise<string> => {
    try {
        const result = await storage.get('accessToken');
        const accessToken = result.accessToken || '';
        return accessToken;
    } catch (error) {
        // Handle any errors here
        console.error('Error retrieving access token:', error);
        return '';
    }
};
