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
