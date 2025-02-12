import React from 'react';
import WalkThroughContainer from 'components/WalkThrough';

const steps: StepsType = [
	{ label: 'Open the "Code" dropdown', elementPaath: '#\\:R55ab\\:' },
	{
		label: 'Copy the URL',
		elementPaath: '#__primerPortalRoot__ > div > div > div > ul > div:nth-child(2) > div > div.Box-sc-g0xbh4-0.cMYnca > div > button',
		dependantElementPath: [`#\\:R55ab\\:`],
	},
	{ label: 'Paste the URL in your terminal', code: 'git clone (URL)' },
];

const Clone = () => {
	return <WalkThroughContainer steps={steps} />;
};

export default Clone;
