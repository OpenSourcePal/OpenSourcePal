import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/tailwind.css';

const popup = <p>Options</p>;

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(popup);
