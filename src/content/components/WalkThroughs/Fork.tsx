import React from 'react';

const Fork = () => {
	return (
		<>
			<ul className="px-3 py-2 flex flex-col gap-2 bg-secondary text-primary">
				<li className="flex items-center justify-between">
					<span>Click on the "fork" button by the "star" button</span>
				</li>
				<li className="flex items-center justify-between">
					<span>Check "Copy the main branch only" option</span>
				</li>
				<li className="flex items-center justify-between">
					<span>Click on create fork</span>
				</li>
			</ul>
		</>
	);
};

export default Fork;
