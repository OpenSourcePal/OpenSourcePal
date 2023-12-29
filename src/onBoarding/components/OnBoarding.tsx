import React from 'react';

import { Icon } from '@iconify/react';

const OnBoarding: React.FC = () => {
	return (
		<div className="h-screen w-screen bg-primary flex justify-center items-center flex-col text-white gap-6">
			<div className="max-w-7xl flex flex-col items-center gap-[-20px]">
				<h1 className="text-f2xl">Welcome to Open Source Pal</h1>
				<h2 className="text-flg">Make Contributing to open source easier</h2>
				<p className="text-fmd flex items-center gap-2">
					<span>Watch the demo</span>
					<Icon icon="fa6-solid:hand-point-down" />
				</p>
			</div>
			<div className="bg-brand w-fit p-3 rounded-md max-w-7xl flex flex-col items-center justify-center gap-4">
				<video className="w-auto aspect-video max-h-[400px] max-w-full rounded-md" autoPlay controls muted>
					<source src="../../assets/media/1228.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<a href="https://discord.com/invite/ufcysW9q23" target="_blank" rel="noopener noreferrer" className="text-lg underline">
					Click here to go to the discord server
				</a>
			</div>
		</div>
	);
};

export default OnBoarding;
