import React from 'react';

import Button from 'components/Button';
import Code from 'components/Code';

import { useArrowNavigation } from 'content/hooks/useArrow';

const Clone = () => {
	const { onClickWalkThrough } = useArrowNavigation();

	return (
		<>
			<ul className="px-3 py-2 flex flex-col gap-2 bg-secondary text-primary">
				<li className="flex items-center justify-between">
					<span>Open the "Code" dropdown</span>
					<Button label="Show Me" action={() => onClickWalkThrough('.js-codespaces-details-container')} className="px-2 py-1 rounded-sm bg-primary text-white" />
				</li>
				<li className="flex items-center justify-between">
					<span>Copy the URL</span>
					<Button label="Show Me" action={() => onClickWalkThrough('.js-clone-url-http')} className="px-2 py-1 rounded-sm bg-primary text-white" />
				</li>
				<li>
					<p>Paste the URL in your terminal</p>
					<Code body="git clone (URL)" />
				</li>
			</ul>
		</>
	);
};

export default Clone;
