import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/tailwind.css';

const popup = (
	<div className='h-screen w-screen bg-blue-900 flex justify-center items-center flex-col'>
		<h1 className=' text-4xl text-white'>Welcome to Open Source Pal</h1>
		<p>Make Contributing to open source easier</p>
	</div>
);

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(popup);
