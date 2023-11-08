import React, { useState, useEffect } from 'react';

import { error, extractDetailsFromUrl, info, retrieveAccessToken } from 'utils/helper';
import Readme from './Readme';
import { isRepoStarred, getUserAssignedIssues } from 'utils/api';

const Repo: React.FC = () => {
	const [contentOpened, setContentOpened] = useState({
		readme: false,
		contributing: false,
	});
	const [issues, setIssues] = useState<any[]>([]);
	const [isStarred, setIsStarred] = useState(false);

	const openContent = (content: 'readme' | 'contributing') => {
		if (content === 'readme') {
			setContentOpened({ ...contentOpened, readme: !contentOpened.readme });
		} else if (content === 'contributing') {
			setContentOpened({ ...contentOpened, contributing: !contentOpened.contributing });
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await retrieveAccessToken();
				if (accessToken === '') return;
				const issues = await getUserAssignedIssues(accessToken);

				if (!issues) {
					setIssues([]);
				} else {
					setIssues(issues);
				}
			} catch (err) {
				error('getting issues', err);
			}
		})();

		(async () => {
			try {
				const accessToken = await retrieveAccessToken();
				if (accessToken === '') return;
				const response = await isRepoStarred(accessToken);
				setIsStarred(response as boolean);
			} catch (error) {
				error('error  issues', error);
			}
		})();
	}, []);

	return (
		<section className="bg-brand w-full p-3 rounded-md flex flex-col gap-4 overflow-y-auto">
			<div className="flex justify-between items-center">
				<p>You are contributing to</p>
				<h2 className="font-semibold text-base">{extractDetailsFromUrl('repo')}</h2>
			</div>

			<div className="flex flex-col gap-1">
				<h2 className="font-semibold text-lg">Do This First</h2>
				<div className="flex flex-col">
					<div className="flex items-center justify-between">
						<span className="flex justify-center gap-2">
							<input type="checkbox" name="star" id="star" value="star" checked={isStarred} onChange={(e) => setIsStarred(e.target.checked)} />
							<label htmlFor="star" className="font-light text-sm">
								Give the repo a star
							</label>
						</span>
					</div>
					<div className="flex flex-col w-full">
						<div className="flex items-center justify-between">
							<span className="flex justify-center gap-2">
								<input type="checkbox" name="readme" id="readme" value="readme" />
								<label htmlFor="readme" className="font-light text-sm">
									Read the "Readme" file
								</label>
							</span>
							<button className="border-none underline underline-offset-2 bg-none text-xs font-normal" onClick={() => openContent('readme')}>
								Summary
							</button>
						</div>
						{/* on click on summary should open a drop down */}
						{contentOpened.readme && (
							<div className="mt-1 px-3">
								<Readme />
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<h2 className="font-semibold text-lg">Issues You're Assigned</h2>
				<div className="flex flex-col gap-2">
					{issues.length !== 0 ? (
						issues.map((item) => {
							return (
								<a href={item.html_url} key={item.node_id}>
									{item.title}
								</a>
							);
						})
					) : (
						<p>You aren't assigned any issues in this repo</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default Repo;
// <div className="flex items-center justify-between">
// 	<span>
// 		<input type="checkbox" name="contributing" id="contributing" />
// 		<label htmlFor="contributing" className="font-light text-sm">
// 			Read the contributing file
// 		</label>
// 	</span>
// 	<button className="border-none underline underline-offset-2 bg-none text-xs font-normal">Summary</button>
// 	{/* on click on summary should open a drop down */}
// </div>
