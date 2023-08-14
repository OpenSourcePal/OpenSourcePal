import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/tailwind.css';

const popup = (
	<div className='bg-blue-900 p-4 w-72'>
		<h1 className='text-xl'>Hello World</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a
			perspiciatis, numquam dolores reiciendis quod ipsam natus vero repellat
			aspernatur impedit excepturi magni quisquam fuga. Ullam, quidem. Minus,
			quo iste?
		</p>
	</div>
);

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(popup);
