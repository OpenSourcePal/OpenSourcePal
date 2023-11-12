import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import { Dna } from 'react-loader-spinner';
import browser from 'webextension-polyfill';
import crypto from 'crypto-js';

import { error, retrieveAccessToken, deleteAccessToken } from 'utils/helper';
import Button from 'components/Button';
import keys from 'popup/keys';
import storage from 'utils/storage';
import { getUserInfo } from 'utils/api';

const secretKey = process.env.SECRET_KEY;

const Popup: React.FC = () => {
	const [userInfo, setUserInfo] = useState<UserInfoType>({
		name: '',
		avatar: '',
		url: '',
	});
	const [loading, setLoading] = useState(false);
	// const [isAuthDone, setIsAuthDone] = useState(false);
	const [isAllowed, setIsAllowed] = useState(false);

	const keyInput = useRef<HTMLInputElement>(null);
	const allowAccess = () => {
		if (keyInput.current?.value === '' || !keyInput.current?.value) return;

		const key = keyInput.current?.value;
		const amIAllowed = keys(key);
		setIsAllowed(amIAllowed);

		storage.set({
			amIAllowed: {
				value: amIAllowed,
				key: crypto.AES.encrypt(key, secretKey as string),
			},
		});
	};

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
				browser.runtime.sendMessage({ action: 'AUTH_CODE_RECEIVED', code }).then(async (response) => {
					if (response.success === false) {
						setLoading(false);
						return;
					}
					await gettingUserInfo();
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

	const gettingUserInfo = async () => {
		setLoading(true);
		try {
			const accessToken = await retrieveAccessToken();
			if (accessToken === '') {
				setUserInfo({ ...userInfo, name: '' });
				setLoading(false);
				return;
			}
			const data = await getUserInfo(accessToken);
			setUserInfo({
				name: data.login,
				avatar: data.avatar_url,
				url: data.html_url,
			});
			setLoading(false);
		} catch (error) {
			console.error('Get User', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isAllowed) return;
		(async () => {
			try {
				const result = await storage.get('amIAllowed');
				const gottenResult = result.amIAllowed || null;

				if (!gottenResult) return;

				const byte = crypto.AES.decrypt(gottenResult.key, secretKey as string);
				const decrypted = byte.toString(crypto.enc.Utf8);
				const amIAllowed = keys(decrypted);

				setIsAllowed(amIAllowed);
			} catch (err) {
				error('Error getting access', err);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			await gettingUserInfo();
		})();
	}, []);

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
					{!isAllowed && (
						<div className="flex flex-col gap-3 items-center">
							<h1>Join Early Access</h1>
							<input placeholder="Enter Key" type="text" ref={keyInput} />
							<Button label="Submit" action={() => allowAccess()} />
						</div>
					)}

					{isAllowed &&
						(userInfo.name === '' ? (
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
								<h2 className="font-semibold text-fmd">Hello {userInfo.name}👋🏾</h2>
								<Button className="p-2 bg-brand rounded flex text-lightest items-center justify-center" action={logOut} label={<span>LogOut</span>} />
							</div>
						))}
				</main>
			)}
		</section>
	);
};

export default Popup;
