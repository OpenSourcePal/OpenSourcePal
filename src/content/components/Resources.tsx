import React from 'react';
import { Icon } from '@iconify/react';

import Button from 'components/Button';
import Accordion from 'components/Accordion';
import resources from 'content/utils/resources';

type ResourcesProps = {
	action: () => void;
};

const Resources = ({ action }: ResourcesProps) => {
	return (
		<div className="flex flex-col gap-6 w-full overflow-y-auto">
			<div className="flex justify-between items-center w-full">
				<Button
					action={action}
					label={
						<>
							<Icon icon="lucide:move-left" />
							<span>Close Resources</span>
						</>
					}
					className="flex gap-2 items-center"
				/>
				<p className="font-semibold text-base">Resources</p>
			</div>

			<div className="flex flex-col gap-5">
				{resources.map((value) => (
					<div key={value.section} className="flex flex-col gap-2">
						<h1 className="font-bold text-lg">{value.section}</h1>
						<div>
							{value.resource.map((item) => (
								<Accordion {...item} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Resources;
