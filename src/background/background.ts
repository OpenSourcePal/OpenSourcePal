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
	console.log(request.action);
	if (request.action === 'AUTH_CODE_RECEIVED') {
		const authorizationCode = request.code;
		fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				client_id: process.env.GITHUB_ID,
				client_secret: process.env.GITHUB_SECRET,
				code: authorizationCode,
			}),
		})
			.then((promise) =>
				promise
					.text()
					.then((data) => {
						const accessToken = new URLSearchParams(data).get('access_token');
						chrome.storage.local
							.set({ accessToken })
							.then(() => console.log('done'));

						sendResponse({ isSuccess: true, token: accessToken });
					})
					.catch((error) => console.log(error)),
			)
			.catch((error) => console.log(error));

		return true;
	}
});
