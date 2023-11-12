import React from 'react';

import '../../assets/css/tailwind.css';

const OnBoarding: React.FC = () => {
	return (
		<div className="h-screen w-screen bg-primary flex justify-center items-center flex-col text-white">
			<div>
				<h1 className="text-4xl">Welcome to Open Source Pal</h1>
				<p>Make Contributing to open source easier</p>
			</div>
		</div>
	);
};

export default OnBoarding;
