import { error } from 'utils/helper';
import storage from 'utils/storage';
import { runtime, tabs, Runtime } from 'webextension-polyfill';

const serverurl = process.env.SEVERURL;
/**
 * Initialize background script
 */
function initBackground() {
	console.log('[===== Loaded Background Scripts =====]');

	// When extension installed
	runtime.onInstalled.addListener(onInstalled);

	// Add message listener in Browser.
	runtime.onMessage.addListener(onMessage);

	// Add Update listener for tab
	tabs.onUpdated.addListener(onUpdatedTab);

	// Add New tab create listener
	tabs.onCreated.addListener(onCreatedTab);
}

/**
 * Extension Installed
 */
const onInstalled = ({ reason }: { reason: any }) => {
	console.log('[===== Installed Extension!] =====', reason);
	if (reason === 'install') {
		chrome.tabs.create({
			url: 'onBoarding/index.html',
		});
	}
};

/**
 * Message Handler Function
 *
 * @param message
 * @param sender
 * @returns
 */
export async function onMessage(message: any, sender: Runtime.SendMessageOptionsType) {
	try {
		if (message.action === 'AUTH_CODE_RECEIVED') {
			const authorizationCode = message.code;
			const response = await fetch('https://github.com/login/oauth/access_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					client_id: process.env.GITHUB_ID,
					client_secret: process.env.GITHUB_SECRET,
					code: authorizationCode,
				}),
			});

			if (response.ok) {
				const data = await response.text();
				const accessToken = new URLSearchParams(data).get('access_token');
				storage.set({ accessToken });
				console.log('Token stored');

				return { isSuccess: true, token: accessToken };
			} else {
				console.error('Error during GitHub authentication');
				return { isSuccess: false, error: 'Authentication failed' };
			}
		} else if (message.action === 'UPDATE_COUNT') {
			const username = message.username;
			try {
				const response = await fetch(`${serverurl}/user/updateCount`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name: username }),
				});

				console.log('res', response.status);
				if (response.status === 204) {
					return true;
				} else {
					return false;
				}
			} catch (err) {
				error('checking limit', err);
				return false;
			}
		}
	} catch (error) {
		console.error('[===== Error in MessageListener =====]', error);
		return error;
	}
}

/**
 * Message from Long Live Connection
 *
 * @param msg
 */
function onMessageFromExtension(msg: string) {
	console.log('[===== Message from Long Live Connection =====]');
}

/**
 * When a new tab is created
 *
 * @param tab
 */
function onCreatedTab(tab: any) {
	console.log('[===== New Tab Created =====]', tab);
}

/**
 * When a tab is updated
 *
 * @param {*} tabId
 * @param {*} changeInfo
 * @param {*} tab
 */
function onUpdatedTab(tabId: any, changeInfo: any, tab: any) {
	console.log('[===== Tab Created =====]', tabId);
}

/**
 * Get URL from tabId
 *
 */
export async function getURLFromTab(tabId: any) {
	try {
		const tab = await tabs.get(tabId);
		return tab.url || '';
	} catch (error) {
		console.log(`[===== Could not get Tab Info$(tabId) in getURLFromTab =====]`, error);
		throw '';
	}
}

/**
 * Open a new tab by URL
 *
 */
export async function openNewTab(url: string) {
	try {
		const tab = await tabs.create({ url });
		return tab;
	} catch (error) {
		console.log(`[===== Error in openNewTab =====]`, error);
		return null;
	}
}

/**
 * Close a specific tab
 *
 * @param {number} tab
 */
export async function closeTab(tab: any) {
	try {
		await tabs.remove(tab.id ?? 0);
	} catch (error) {
		console.log(`[===== Error in closeTab =====]`, error);
	}
}

/**
 * Send a message
 */
export async function sendMessage(tab: any, msg: string) {
	try {
		const res = await tabs.sendMessage(tab.id ?? 0, msg);
		return res;
	} catch (error) {
		console.log(`[===== Error in sendMessage =====]`, error);
		return null;
	}
}

// Initialize the background script
initBackground();
