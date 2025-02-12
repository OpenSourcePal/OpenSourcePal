import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import { Dna } from 'react-loader-spinner';
import browser from 'webextension-polyfill';

import { error, retrieveAccessToken, deleteAccessToken } from 'utils/helper';
import Button from 'components/Button';
import storage from 'utils/storage';
import { getUserInfo } from 'utils/api';

const serverurl = process.env.SERVERURL;

const Popup: React.FC = () => {
	const [userInfo, setUserInfo] = useState<UserInfoType>({
		name: '',
		avatar: '',
		url: '',
	});
	const [loading, setLoading] = useState({ auth: false, key: false });
	const [systemError, setSystemError] = useState<null | string>(null);

	const keyInput = useRef<HTMLInputElement>(null);

	const authenticateGitHub = () => {
		setLoading({ ...loading, auth: true });

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
					throw new Error('Error during GitHub authentication');
				}

				const code = new URLSearchParams(new URL(redirectUrl).search).get('code');
				if (!code) {
					throw new Error('GitHub authentication failed');
				}
				browser.runtime.sendMessage({ action: 'AUTH_CODE_RECEIVED', code }).then(async (response) => {
					if (response.success === false) {
						throw new Error('No auth code was recieved');
					}
					await gettingUserInfo();
				});
			})
			.catch((error) => {
				setLoading({ ...loading, auth: false });
				error('Auth', error);
				setSystemError(`Oops, couldn't authenticate user, pls try again or contact support`);
			});
	};

	const logOut = async () => {
		await deleteAccessToken();
		setUserInfo({ ...userInfo, name: '' });
	};

	const gettingUserInfo = async () => {
		setLoading({ ...loading, auth: true });
		try {
			const accessToken = await retrieveAccessToken();
			if (accessToken === '') {
				throw new Error('No access token');
			}
			const data = await getUserInfo(accessToken);
			setUserInfo({
				name: data.login,
				avatar: data.avatar_url,
				url: data.html_url,
				email: data.email,
			});
		} catch (err) {
			setUserInfo({ ...userInfo, name: '' });
			error('Get User', err);
		} finally {
			setLoading({ ...loading, auth: false });
		}
	};

	const checkIsKeyValid = async (key: string) => {
		if (userInfo.name === '') return false;
		try {
			const response = await fetch(`${serverurl}/key`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ key, name: userInfo.name }),
			});

			console.log('res', response.status);
			if (response.status === 204) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			error('checking key', err);
			return false;
		}
	};

	useEffect(() => {
		(async () => {
			await gettingUserInfo();
		})();
	}, []);

	useEffect(() => {
		if (userInfo.name === '') return;

		(async () => {
			try {
				const response = await fetch(`${serverurl}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name: userInfo.name }),
				});

				const data = await response.json();
				if (response.ok) {
					const { message, token, isSuccess } = data;
					if (isSuccess) {
						storage.set({ token });
					} else {
						throw new Error(message);
					}
				}
			} catch (err) {
				error('Adding User', err);
				setSystemError('Oops! Something went wrong. Please try again or contact support.');
			}
		})();
	}, [userInfo]);

	return (
		<section className="w-80 bg-lightest flex flex-col">
			<header className="flex flex-col bg-primary py-2 px-4 text-secondary">
				<h1 className="text-flg font-bold">Open Source Pal</h1>
				<h2 className="text-base font-bold -mt-2">Your Open Source Assistant</h2>
			</header>
			{loading.auth ? (
				<div className="w-full flex justify-center items-center">
					<Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperClass="dna-wrapper" />
				</div>
			) : (
				<main className="w-full p-4">
					{userInfo.name === '' ? (
						<span className="w-full flex justify-center items-center">
							<Button
								className="h-12 p-2 bg-brand rounded flex gap-1 text-lightest items-center justify-center"
								action={authenticateGitHub}
								label={
									<>
										<Icon icon="devicon:github" className="h-6 w-6 text-secondary" />
										<span>Connect Your GitHub</span>
									</>
								}
							/>
						</span>
					) : (
						<div className="flex justify-between flex-wrap items-center">
							<h2 className="font-semibold text-fmd">Hello {userInfo.name}</h2>
							<Button className="p-2 bg-brand rounded flex text-lightest items-center justify-center" action={logOut} label={<span>LogOut</span>} />
						</div>
					)}
					<p className="text-red-600 text-fxs text-center">{systemError}</p>
				</main>
			)}
		</section>
	);
};

export default Popup;
