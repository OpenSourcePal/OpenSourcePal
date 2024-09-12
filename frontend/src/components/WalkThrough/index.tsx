import React from 'react';
import StepItem from './StepItem';
import StepsContainter from './StepsContainter';

const WalkThroughContainer = ({ steps }: WalkThroughContainerType) => {
	return (
		<StepsContainter>
			{steps.map((item) => (
				<StepItem {...item} key={item.label} />
			))}
		</StepsContainter>
	);
};

export default WalkThroughContainer;
