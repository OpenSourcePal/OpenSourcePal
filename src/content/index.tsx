// REACT
import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';

// LIBRIES
import { Icon } from '@iconify/react';
import { runtime } from 'webextension-polyfill';
import { animated, useSpring } from '@react-spring/web';

// LOCAL
import '../assets/css/tailwind.css';
import { gettingUserInfo, retrieveAccessToken } from 'utils/helper';

// COMPONENTS
import Repo from './components/Repo';

function Main() {
	const [userInfo, setUserInfo] = useState<UserInfoType>({
		name: '',
		avatar: '',
		url: '',
	});
	const [isOpen, setIsOpen] = useState(false);

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
			const accessToken = await retrieveAccessToken();
			gettingUserInfo(accessToken, setUserInfo);
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
				className="w-screen max-w-[350px] md:w-[400px] md:max-w-[500px] h-screen bg-primary px-3 py-4 text-secondary hidden flex-col gap-4 fixed right-0 top-0"
				style={sidebarAnimation}
				ref={mainSideBar}
			>
				<header className="flex justify-between items-center">
					<Icon icon="tabler:layout-sidebar-left-expand-filled" className="h-6 w-6 text-secondary cursor-pointer" onClick={closeSideBar} />
					<div className="flex items-center">
						<img src={userInfo.avatar} alt={userInfo.name} className="rounded-full h-7 w-7" />
						<h2 className="text-fsm">{userInfo.name}</h2>
					</div>
				</header>

				<Repo />
			</animated.main>
		</>
	);
}

// check if the url is a repo
const isRepo = `https://github.com${window.location.pathname}`.match('https://github.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+(/.*)?');

// attach content if it's a repo
if (isRepo !== null) {
	const app = document.createElement('section');
	app.id = 'my-extension-root';
	app.className = 'z-30 relative';

	let elementToAttach = document.querySelector('body .AppHeader-globalBar-end');
	if (elementToAttach === null) {
		elementToAttach = document.body;
	}

	elementToAttach.appendChild(app);

	const root = createRoot(app);

	root.render(<Main />);
}
