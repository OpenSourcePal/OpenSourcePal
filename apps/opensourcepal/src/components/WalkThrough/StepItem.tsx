import Code from 'components/Code';
import React from 'react';
import ShowMe from 'content/components/ShowMe';

const StepItem = ({ label, elementPaath, dependantElementPath, code }: StepItemType) => {
	return (
		<li className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<span>{label}</span>
				{elementPaath && <ShowMe dependantElementPath={dependantElementPath} elementPaath={elementPaath} />}
			</div>
			{code && <Code body={code} />}
		</li>
	);
};

export default StepItem;
