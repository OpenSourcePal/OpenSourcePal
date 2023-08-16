import React from 'react';
import { createRoot } from 'react-dom/client';

import '../assets/tailwind.css';

// Create the root element
const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
// Render the Popup component into the root element
function pageRoot(Children: React.FC) {
	root.render(<Children />);
}

export default pageRoot;
