export const isFirefox = navigator.userAgent.match(/firefox|fxios/i);

export const getElement = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement;

export function removeSpaces(selector: string): string {
	return selector.replace(/\s+/g, '');
}

export function addSpaces(selector: string): string {
	return selector.replace(/>\s*/g, ' > ');
}
