import React, { FormEvent, useState } from 'react';
import { Icon } from '@iconify/react';

import Button from 'components/Button';
import Accordion from 'components/Accordion';
import resources, { Section } from 'content/utils/resources';

type ResourcesProps = {
	action: () => void;
};

const Resources = ({ action }: ResourcesProps) => {
	const [searchedResource, setSearchedResource] = useState(resources);

	const onType = (e: FormEvent<HTMLInputElement>) => {
		const query = e.currentTarget.value;
		const results: Section[] = [];

		resources.forEach((section) => {
			const matchingResources = section.resource.filter((resource) => resource.body.toLowerCase().includes(query.toLowerCase()));

			if (matchingResources.length > 0) {
				results.push({
					section: section.section,
					resource: matchingResources,
				});
			}
		});

		setSearchedResource(results);
	};
	return (
		<div className="flex flex-col gap-6 w-full overflow-y-auto">
			<div className="flex justify-between items-center w-full sticky top-0 bg-primary">
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

			<input
				type="text"
				onChange={onType}
				placeholder="What are you looking for?"
				className="bg-secondary border text-primary text-sm rounded-sm focus:ring-brand focus:border-brand block w-full p-2.5"
			/>

			<div className="flex flex-col gap-5">
				{searchedResource.map((value) => (
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
