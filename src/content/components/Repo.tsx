import React, { useState, useEffect } from 'react';

import detectChangeUrl from 'detect-url-change';
import OpenAI from 'openai';
import Markdown from 'react-markdown';
import browser from 'webextension-polyfill';

import Readme from './Readme';
import { error, extractDetailsFromUrl, retrieveAccessToken } from 'utils/helper';
import { isRepoStarred, getUserAssignedIssues, getIssueInfo } from 'utils/api';
import Button from 'components/Button';

type issuesType = {
	listOfIssues: any[];
	isIssuesTab: boolean;
	issueNumber: number;
	issueTitle: string | null;
	issueBody: string | null;
	issueHelp: string | null;
};

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

// TODO: add loading messages instead of just loading
// TODO: add result of issue help to localhost
const Repo: React.FC<{ className: string; name: string }> = ({ className, name }) => {
	const [contentOpened, setContentOpened] = useState({
		readme: false,
		contributing: false,
	});
	const [{ listOfIssues, isIssuesTab, issueNumber, issueTitle, issueBody, issueHelp }, setIssues] = useState<issuesType>({
		listOfIssues: [],
		isIssuesTab: false,
		issueNumber: NaN,
		issueTitle: null,
		issueBody: null,
		issueHelp: null,
	});
	const [isStarred, setIsStarred] = useState(false);
	const [loading, setLoading] = useState(false);

	const openContent = (content: 'readme' | 'contributing') => {
		if (content === 'readme') {
			setContentOpened({ ...contentOpened, readme: !contentOpened.readme });
		} else if (content === 'contributing') {
			setContentOpened({ ...contentOpened, contributing: !contentOpened.contributing });
		}
	};

	useEffect(() => {
		(async () => {
			// get issues
			try {
				const accessToken = await retrieveAccessToken();
				if (accessToken === '') return;
				const listIssues = await getUserAssignedIssues(accessToken);

				if (!listIssues) {
					setIssues((prevIssues) => ({ ...prevIssues, listOfIssues: [] }));
				} else {
					setIssues((prevIssues) => ({ ...prevIssues, listOfIssues: listIssues }));
				}
			} catch (err) {
				error('getting issues', err);
			}

			// check if user stared it
			try {
				const accessToken = await retrieveAccessToken();
				if (accessToken === '') return;
				const response = await isRepoStarred(accessToken);
				setIsStarred(response as boolean);
			} catch (error) {
				error('error  issues', error);
			}
		})();

		const checkUrlChange = (newUrl: string) => {
			const url = newUrl.split('https://github.com');

			const splittedUrl = url[1].split('/')[3];
			const hasIssueNumber = Number(url[1].split('/')[4]);

			if (splittedUrl === 'issues' && !Number.isNaN(hasIssueNumber)) {
				setIssues((prevIssues) => ({ ...prevIssues, isIssuesTab: true }));
				setIssues((prevIssues) => ({ ...prevIssues, issueNumber: hasIssueNumber }));
			} else {
				setIssues((prevIssues) => ({ ...prevIssues, isIssuesTab: false }));
				setIssues((prevIssues) => ({ ...prevIssues, issueNumber: NaN }));
			}
		};

		detectChangeUrl.on('change', checkUrlChange);

		// check on mount
		const url = window.location.href;
		checkUrlChange(url);

		return () => {
			detectChangeUrl.off('change', checkUrlChange);
		};
	}, []);

	useEffect(() => {
		if (!isIssuesTab || Number.isNaN(issueNumber)) return;

		(async () => {
			const accessToken = await retrieveAccessToken();
			if (accessToken === '') return;
			const issueInfo = await getIssueInfo(accessToken, issueNumber);

			setIssues((prevIssues) => ({ ...prevIssues, ...issueInfo }));
		})();
	}, [isIssuesTab, issueNumber]);

	const getIssueHelp = async () => {
		// TODO: add proper error messages
		if (!issueTitle && !issueBody && !isIssuesTab) return;

		setLoading(true);
		// TODO: check if user is assigned to the issue
		checkLimitAndUpdate();
	};

	const checkLimitAndUpdate = () => {
		browser.runtime
			.sendMessage({ action: 'UPDATE_COUNT', username: name })
			.then(async (response: boolean) => {
				if (response) {
					await setIssueHelp();
				}
				setLoading(false);
			})
			.catch((err: any) => {
				error('failed update', err);
				setLoading(false);
			});
	};

	const setIssueHelp = async () => {
		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: `You are an expert at open source software and software development and I'm a beginner` },
				{
					role: 'user',
					content: `Give me steps for solving this github issue i was assigned to code wise if it's related to coding/programming, if it's not give the general steps to help solve it, the issue title is "${issueTitle}" and the issue body is "${issueBody}", return the result in list form and markdown`,
				},
			],
		});
		setIssues((prevIssues) => ({ ...prevIssues, issueHelp: completion.choices[0].message.content }));
	};

	return (
		<section className={'bg-brand w-full p-3 rounded-md flex-col gap-4 overflow-y-auto ' + className}>
			<div className="flex justify-between items-center">
				<p>You are contributing to</p>
				<h2 className="font-semibold text-base text-center">{extractDetailsFromUrl('repo')?.toUpperCase()}</h2>
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
							<Button className="border-none underline underline-offset-2 bg-none text-xs font-normal" action={() => openContent('readme')} label="Summary" />
						</div>
						{/* on click on summary should open a drop down */}
						{contentOpened.readme && (
							<div className="mt-1 px-3">
								<Readme username={name} closeReadme={() => openContent('readme')} />
							</div>
						)}
					</div>
				</div>
			</div>

			{!isIssuesTab && (
				<div className="flex flex-col gap-1">
					<h2 className="font-semibold text-lg">Issues You're Assigned</h2>
					<div className="flex flex-col gap-2">
						{listOfIssues.length !== 0 ? (
							listOfIssues.map((item) => {
								return (
									<a href={item.html_url} key={item.id}>
										{item.title}
									</a>
								);
							})
						) : (
							<p>You aren't assigned any issues in this repo</p>
						)}
					</div>
				</div>
			)}

			{isIssuesTab && (
				<div>
					<h2 className="font-semibold text-lg">Issue Help</h2>
					{loading ? <p>Loading</p> : issueHelp ? <Markdown className="p-2 issue-help">{issueHelp || ''}</Markdown> : <Button action={getIssueHelp} label="Get Help" />}
				</div>
			)}
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
