export const retrieveAccessToken = (
	callback: (accessToken: string) => void,
): void => {
	chrome.storage.local.get(['accessToken'], (result) => {
		const accessToken = result.accessToken || '';
		callback(accessToken);
	});
};
