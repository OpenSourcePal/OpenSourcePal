import storage from './storage';
import { getUserInfo } from './api';

export const retrieveAccessToken = async (): Promise<string> => {
	try {
		const result = await storage.get('accessToken');
		const accessToken = result.accessToken || '';
		return accessToken;
	} catch (error) {
		// Handle any errors here
		error('Error retrieving access token:', error);
		return '';
	}
};

export const deleteAccessToken = async (): Promise<void> => {
	try {
		// Use the storage object to remove the access token
		await storage.remove('accessToken');
	} catch (error) {
		// Handle any errors here
		console.error('Error deleting access token:', error);
	}
};

export const info = (task: string, data?: any) => {
	task = `'${task.toUpperCase()}'`;
	if (data === undefined) {
		console.log(`======== SINGLE INFO ${task} ========`);
		return;
	}
	console.log(`======== INFO FROM ${task} START ========`);
	console.log(data);
	console.log(`======== INFO FROM ${task} END ========`);
};

export const error = (task: string, error: any) => {
	console.log(`======== ERROR IN ${task} START ========`);
	console.error(error);
	console.log(`======== ERROR IN ${task} END ========`);
};

export function extractDetailsFromUrl(type: 'repo' | 'owner', url?: string): string | null {
	url = url === undefined ? window.location.pathname : url;
	url = url.slice(1);
	const splited = url.split('/');
	return type === 'repo' ? splited[1] : type === 'owner' ? splited[0] : null;
}
