/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
chrome.runtime.onInstalled.addListener(() => {
    console.log('Just installed my chrome extension');
});
chrome.bookmarks.onCreated.addListener(() => {
    console.log('I just bookmarked this page');
});

/******/ })()
;
//# sourceMappingURL=background.js.map