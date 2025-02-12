import React from 'react';
import WalkThroughContainer from 'components/WalkThrough';

const steps: StepsType = [
	{
		label: 'Click on the "fork" button by the "star" button',
		elementPaath: '#fork-button',
	},
	{
		label: 'Check "Copy the main branch only" option',
		elementPaath: '#js-repo-pjax-container > react-app > div > form > div.Box-sc-g0xbh4-0.ggBEtM > div.Box-sc-g0xbh4-0.hZnBBv > label',
		dependantElementPath: ['#fork-button'],
	},
	{ label: 'Click on create fork', elementPaath: '#js-repo-pjax-container > react-app > div > form > div.Box-sc-g0xbh4-0.aBKvw > button', dependantElementPath: ['#fork-button'] },
];

const Fork = () => {
	return <WalkThroughContainer steps={steps} />;
};

export default Fork;
