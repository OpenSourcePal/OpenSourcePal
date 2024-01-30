import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import Button from 'components/Button';
import Accordion from 'components/Accordion';
import Clone from './WalkThroughs/Clone';
import Fork from './WalkThroughs/Fork';

type WalkThroughProps = {
	action: () => void;
};

const WalkThrough = ({ action }: WalkThroughProps) => {
	return (
		<div className="flex flex-col gap-6 w-full overflow-y-auto">
			<div className="flex justify-between items-center w-full sticky top-0 bg-primary">
				<Button
					action={action}
					label={
						<>
							<Icon icon="lucide:move-left" />
							<span>Close WalkThrough</span>
						</>
					}
					className="flex gap-2 items-center"
				/>
				<p className="font-semibold text-base">WalkThrough</p>
			</div>
			<div className="flex flex-col gap-1">
				<Accordion title="How to clone a repo" body={<Clone />} isMarkdown={false} />
				<Accordion title="How to fork a repo" body={<Fork />} isMarkdown={false} />
			</div>
		</div>
	);
};

export default WalkThrough;
