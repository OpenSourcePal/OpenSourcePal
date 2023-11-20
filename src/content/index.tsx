// REACT
import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';

// LIBRIES
import { Icon } from '@iconify/react';

import detectChangeUrl from 'detect-url-change';
import { animated, useSpring } from '@react-spring/web';
import { Dna } from 'react-loader-spinner';

// LOCAL
import '../assets/css/tailwind.css';
import { retrieveAccessToken } from 'utils/helper';

// COMPONENTS
import Repo from './components/Repo';
import Resources from './components/Resources';
import WalkThrough from './components/WalkThrough';
import Button from 'components/Button';

import { getUserInfo } from 'utils/api';
import storage from 'utils/storage';

function Main() {
	const [userInfo, setUserInfo] = useState<UserInfoType>({
		name: '',
		avatar: '',
		url: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [openSection, setSection] = useState({
		resources: false,
		walkthrough: false,
	});
	const [loading, setLoading] = useState(false);
	const [isAllowed, setIsAllowed] = useState(false);

	// ALL REFS
	const mainSideBar = useRef<HTMLDivElement | null>(null);

	// ALL ANIMATIONS
	const sidebarAnimation = useSpring({
		transform: isOpen ? 'translateX(0)' : 'translateX(1000%)',
		onStart: () => {
			if (mainSideBar.current === null) return;
			if (isOpen === false) {
				mainSideBar.current.style.display = 'none';
				return;
			}

			mainSideBar.current.style.display = 'flex';
		},
	});

	useEffect(() => {
		(async () => {
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
				const result = await storage.get('amIAllowed');
				const gottenResult = result.amIAllowed || null;
				setIsAllowed(gottenResult || false);
				setLoading(false);
			} catch (error) {
				console.error('Get User', error);
				setLoading(false);
			}
		})();
	}, []);

	const openSideBar = () => {
		setIsOpen(true);
	};

	const closeSideBar = () => {
		setIsOpen(false);
	};

	return (
		<>
			{!isOpen && <Icon icon="tabler:layout-sidebar-right-expand-filled" className="h-6 w-6 text-secondary cursor-pointer" onClick={openSideBar} />}

			<animated.main
				className="w-screen max-w-[350px] md:w-[400px] md:max-w-[500px] h-screen bg-primary px-3 py-4 text-secondary hidden flex-col gap-4 fixed right-0 top-0 main-OSP"
				style={sidebarAnimation}
				ref={mainSideBar}
			>
				{loading ? (
					<div className="w-full flex justify-center items-center">
						<Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperClass="dna-wrapper" />
					</div>
				) : userInfo.name !== '' && isAllowed ? (
					<>
						<header className="flex justify-between items-center">
							<Icon icon="tabler:layout-sidebar-left-expand-filled" className="h-6 w-6 text-secondary cursor-pointer" onClick={closeSideBar} />
							<div className="flex items-center">
								<img src={userInfo.avatar} alt={userInfo.name} className="rounded-full h-7 w-7" />
								<h2 className="text-fsm">{userInfo.name}</h2>
							</div>
						</header>

						{!openSection.resources && !openSection.walkthrough && (
							<div className="flex items-center justify-between">
								<Button
									label={
										<>
											<Icon icon="lucide:move-right" />
											<span>Open Resources</span>
										</>
									}
									action={() => setSection({ resources: true, walkthrough: false })}
									className="flex gap-2 items-center"
								/>
								<Button label="Take a Walkthrough" action={() => setSection({ resources: false, walkthrough: true })} className="bg-brand py-1 px-2 rounded-sm text-secondary" />
							</div>
						)}

						{openSection.walkthrough && <WalkThrough action={() => setSection({ ...openSection, walkthrough: false })} />}
						{openSection.resources && <Resources action={() => setSection({ ...openSection, resources: false })} />}

						<Repo className={openSection.resources || openSection.walkthrough ? 'hidden' : 'flex'} name={userInfo.name} />
					</>
				) : (
					<p>Please Login by clicking on the Extension's Icon</p>
				)}
			</animated.main>
		</>
	);
}

function isElementAttached(elementId: string): boolean {
	const existingElement = document.getElementById(elementId);
	return existingElement !== null;
}

function attachContent() {
	const elementId = 'open-source-pal';

	// Check if the element is already attached
	if (isElementAttached(elementId)) {
		return;
	}

	const app = document.createElement('section');
	app.id = elementId;
	app.className = 'z-[200] relative';

	let elementToAttach = document.querySelector('body .AppHeader-globalBar-end');
	if (elementToAttach === null) {
		elementToAttach = document.body;
	}

	elementToAttach.appendChild(app);

	const root = createRoot(app);

	root.render(<Main />);
}

detectChangeUrl.on('change', (newUrl) => {
	const isRepo = newUrl.match('https://github.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+(/.*)?');

	// check if the url is a repo
	if (!isRepo) return;
	attachContent();
});