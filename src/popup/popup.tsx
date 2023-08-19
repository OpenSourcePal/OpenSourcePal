import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import pageRoot from '../utils/pageRoot';
import { getUserInfo } from '../utils/api';

type User = {
	name: string;
	avatar: string;
	url: string;
};
const Popup: React.FC = () => {
	const [userInfo, setUserInfo] = useState<User>({
		name: '',
		avatar: '',
		url: '',
	});

	const authenticateGitHub = () => {
		const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${
			process.env.GITHUB_ID
		}&redirect_uri=${encodeURIComponent(
			chrome.identity.getRedirectURL('./redirect.html'),
		)}&scope=user`;

		chrome.identity.launchWebAuthFlow(
			{
				url: authorizationUrl,
				interactive: true,
			},
			(redirectUrl) => {
				if (chrome.runtime.lastError || !redirectUrl) {
					console.error('Error during GitHub authentication');
					return;
				}

				const code = new URLSearchParams(new URL(redirectUrl).search).get(
					'code',
				);
				if (!code) {
					console.error('GitHub authentication failed');
					return;
				}

				chrome.runtime.sendMessage(
					{ action: 'AUTH_CODE_RECEIVED', code },
					(response) => {
						getUserInfo(response.token).then((data) =>
							setUserInfo({
								name: data.name,
								avatar: data.avatar_url,
								url: data.hrml_url,
							}),
						);
					},
				);
			},
		);
	};

	return (
		<section className='w-80 bg-lightest flex flex-col'>
			<header className='flex flex-col bg-dark py-2 px-4 text-lightest'>
				<h1 className='text-flg font-bold'>Open Source Pal</h1>
				<h2 className='text-base font-bold -mt-2'>
					Your Open Source Assistant
				</h2>
			</header>
			<main className='w-full p-4'>
				{userInfo.name === '' ? (
					<span className='w-full flex justify-center items-center'>
						<button
							className='h-12 p-2 bg-mid-dark rounded flex gap-1 text-lightest items-center justify-center'
							onClick={authenticateGitHub}>
							<Icon icon='devicon:github' className='h-6 w-6 text-lightest' />
							<span>Connect Your GitHub</span>
						</button>
					</span>
				) : (
					<p>Hello {userInfo.name}👋🏾</p>
				)}
			</main>
		</section>
	);
};

pageRoot(Popup);
