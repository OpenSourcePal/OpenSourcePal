import { getVerificationCode, pollAuthorization } from '../utils/oauth';

chrome.runtime.onInstalled.addListener(() => {
	console.log('Just installed my chrome extension');
});

chrome.bookmarks.onCreated.addListener(() => {
	console.log('I just bookmarked this page');
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		chrome.tabs.create({
			url: 'onBoarding.html',
		});
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.action) {
		case 'AUTH_REQUEST':
			authRequest();
			break;

		default:
			break;
	}
});

async function authRequest() {
	console.log('here');
	const verification = await getVerificationCode();

	console.log('Open %s', verification.verification_uri);
	console.log('Enter code: %s', verification.user_code);

	chrome.runtime.sendMessage({
		type: 'AUTH_RESPONSE',
		payload: {
			code: verification.user_code,
			uri: verification.verification_uri,
		},
	});

	const accessToken = await pollAuthorization(
		verification.device_code,
		verification.interval,
	);

	console.log('AccessToken: ', accessToken);

	console.log('Authorized Auto Gistify');

	chrome.storage.sync.set({
		accessToken,
	});
}
