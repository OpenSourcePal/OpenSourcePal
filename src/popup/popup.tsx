import React, { useEffect } from 'react';

import { Icon } from '@iconify/react';
import pageRoot from '../utils/pageRoot';

const Popup: React.FC = () => {
	useEffect(() => {
		// This effect will run after the component mounts
		console.log('Popup component mounted');

		// Clean up the effect
		return () => {
			console.log('Popup component unmounted');
		};
	}, []);

	const handleConnectClick = () => {
		chrome.runtime.sendMessage({ action: 'AUTH_REQUEST' });
	};

	return (
		<section className='w-80 bg-lightest flex flex-col'>
			<header className='flex flex-col bg-dark py-2 px-4 text-lightest'>
				<h1 className='text-flg font-bold'>Open Source Pal</h1>
				<h2 className='text-base font-bold -mt-2'>
					Your Open Source Assistant
				</h2>
			</header>
			<main className='w-full p-4'>
				<span className='w-full flex justify-center items-center'>
					<button
						className='h-12 p-2 bg-mid-dark rounded flex gap-1 text-lightest items-center justify-center'
						onClick={handleConnectClick}>
						<Icon icon='devicon:github' className='h-6 w-6 text-lightest' />
						<span>Connect Your GitHub</span>
					</button>
				</span>
			</main>
		</section>
	);
};

console.log(typeof Popup);
pageRoot(Popup);
