chrome.runtime.onInstalled.addListener(() => {
	console.log('Just installed my chrome extension');
});

chrome.bookmarks.onCreated.addListener(() => {
	console.log('I just bookmarked this page');
});
