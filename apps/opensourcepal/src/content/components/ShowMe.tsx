import Button from 'components/Button';
import React from 'react';
import { useArrowNavigation } from 'content/hooks/useArrow';

// the dependantElementPath array should be from the root to the current
const ShowMe = ({ elementPaath, dependantElementPath }: ShowMeType) => {
	const { onClickWalkThrough } = useArrowNavigation();

	return <Button label="Show Me" action={() => onClickWalkThrough(elementPaath, dependantElementPath)} className={`px-2 py-1 rounded-sm bg-primary text-white max-w-fit text-nowrap`} />;
};

export default ShowMe;
