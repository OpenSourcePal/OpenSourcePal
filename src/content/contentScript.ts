window.onload = () => {
	// Check if we're on a GitHub repository page
	const isRepo = window.location.href.match(
		'https://github.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+(/.*)?',
	);

	if (isRepo !== null) {
		const button = document.createElement('button');
		button.innerText = 'My Button';

		document.body.appendChild(button);

		// Add an event handler to the button
		button.addEventListener('click', () => {
			// Perform some action when the button is clicked
			alert('Button Clicked!');
		});
	}
};
