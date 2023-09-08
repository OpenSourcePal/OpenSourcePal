import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { Dna } from 'react-loader-spinner';
import browser from 'webextension-polyfill';

import { error, info, retrieveAccessToken, gettingUserInfo, deleteAccessToken } from 'utils/helper';
import { sendUserToServer } from 'utils/api';

const Popup: React.FC = () => {
	const [userInfo, setUserInfo] = useState<UserInfoType>({
		name: '',
		avatar: '',
		url: '',
	});
	const [loading, setLoading] = useState(false);
	const [isAuthDone, setIsAuthDone] = useState(false);

	useEffect(() => {
		const getToken = async () => {
			try {
				const accessToken = await retrieveAccessToken();
				if (accessToken === '') {
					setUserInfo({ ...userInfo, name: '' });
					return;
				}

				gettingUserInfo(accessToken, setUserInfo, setLoading);
			} catch (error) {
				error('Get Token', error);
			}
		};

		getToken();
	}, []);

	useEffect(() => {
		if (!isAuthDone || userInfo.name === '') return;

		(async () => {
			await sendUserToServer(userInfo);

			setIsAuthDone(false);
		})();
	}, [isAuthDone, userInfo]);

	const authenticateGitHub = () => {
		setLoading(true);

		const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${encodeURIComponent(
			browser.identity.getRedirectURL('./redirect.html'),
		)}&scope=user`;

		browser.identity
			.launchWebAuthFlow({
				url: authorizationUrl,
				interactive: true,
			})
			.then((redirectUrl) => {
				if (browser.runtime.lastError || !redirectUrl) {
					error('redirectURL', 'Error during GitHub authentication');
					setLoading(false);
					return;
				}

				const code = new URLSearchParams(new URL(redirectUrl).search).get('code');
				if (!code) {
					error('Code', 'GitHub authentication failed');
					setLoading(false);
					return;
				}
				browser.runtime.sendMessage({ action: 'AUTH_CODE_RECEIVED', code }).then((response) => {
					if (response.success === false) {
						setLoading(false);
						return;
					}
					gettingUserInfo(response.token, setUserInfo, setLoading);
					setIsAuthDone(true);
				});
			})
			.catch((error) => {
				error('Auth', error);
			});
	};

	const logOut = async () => {
		await deleteAccessToken();
		setUserInfo({ ...userInfo, name: '' });
	};

	return (
		<section className="w-80 bg-lightest flex flex-col">
			<header className="flex flex-col bg-primary py-2 px-4 text-secondary">
				<h1 className="text-flg font-bold">Open Source Pal</h1>
				<h2 className="text-base font-bold -mt-2">Your Open Source Assistant</h2>
			</header>
			{loading ? (
				<div className="w-full flex justify-center items-center">
					<Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperClass="dna-wrapper" />
				</div>
			) : (
				<main className="w-full p-4">
					{userInfo.name === '' ? (
						<span className="w-full flex justify-center items-center">
							<button className="h-12 p-2 bg-brand rounded flex gap-1 text-lightest items-center justify-center" onClick={authenticateGitHub}>
								<Icon icon="devicon:github" className="h-6 w-6 text-secondary" />
								<span>Connect Your GitHub</span>
							</button>
						</span>
					) : (
						<div className="flex justify-between flex-wrap items-center">
							<h2 className="font-semibold text-fmd">Hello {userInfo.name}👋🏾</h2>

							<button className="p-2 bg-brand rounded flex text-lightest items-center justify-center" onClick={logOut}>
								<span>LogOut</span>
							</button>
						</div>
					)}
				</main>
			)}
		</section>
	);
};

export default Popup;
