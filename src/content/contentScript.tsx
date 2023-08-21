import React from 'react';
import { createRoot } from 'react-dom/client';

const ContentScript = () => {
	return (
		<div className='osp'>
			<h1>Okay</h1>
			<h2>This should work please</h2>
		</div>
	);
};

document.addEventListener('DOMContentLoaded', () => {
	console.log('content script');
	const root = document.createElement('div');
	root.id = 'osp';
	document.body.appendChild(root);

	const shadowRoot = root.attachShadow({ mode: 'open' });

	const render = document.createElement('div');
	shadowRoot.appendChild(render);

	createRoot(render).render(<ContentScript />);
});

// window.onload = () => {
// 	// Check if we're on a GitHub repository page
// 	const isRepo = window.location.href.match(
// 		'https://github.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+(/.*)?',
// 	);

// 	if (isRepo !== null) {
// 		const button = document.createElement('button');
// 		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200"><path fill="currentColor" d="M779.843 599.925c0 95.331-80.664 172.612-180.169 172.612c-99.504 0-180.168-77.281-180.168-172.612c0-95.332 80.664-172.612 180.168-172.612c99.505-.001 180.169 77.281 180.169 172.612zM600 240.521c-103.025.457-209.814 25.538-310.904 73.557C214.038 351.2 140.89 403.574 77.394 468.219C46.208 501.218 6.431 549 0 599.981c.76 44.161 48.13 98.669 77.394 131.763c59.543 62.106 130.786 113.018 211.702 154.179C383.367 931.674 487.712 958.015 600 959.48c103.123-.464 209.888-25.834 310.866-73.557c75.058-37.122 148.243-89.534 211.74-154.179c31.185-32.999 70.962-80.782 77.394-131.763c-.76-44.161-48.13-98.671-77.394-131.764c-59.543-62.106-130.824-112.979-211.74-154.141C816.644 268.36 712.042 242.2 600 240.521zm-.076 89.248c156.119 0 282.675 120.994 282.675 270.251c0 149.256-126.556 270.25-282.675 270.25S317.249 749.275 317.249 600.02c0-149.257 126.556-270.251 282.675-270.251z"/></svg>`;

// 		button.className = `h-8 w-8`;
// 		document.body.appendChild(button);

// 		// Add an event handler to the button
// 		button.addEventListener('click', () => {
// 			// Perform some action when the button is clicked
// 			alert('Button Clicked!');
// 		});
// 	}
// };
