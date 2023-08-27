import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import { runtime } from 'webextension-polyfill';
import { animated, useSpring } from '@react-spring/web';

import '../assets/css/tailwind.css';
import { extractRepoNameFromUrl, gettingUserInfo, info, retrieveAccessToken } from 'utils/helper';

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

            mainSideBar.current.style.display = 'block';
        },
    });

    useEffect(() => {
        (async () => {
            info('repoName', extractRepoNameFromUrl(window.location.href));
            const accessToken = await retrieveAccessToken();
            info('token', accessToken);
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
            {!isOpen && (
                <Icon
                    icon="tabler:layout-sidebar-right-expand-filled"
                    className="h-6 w-6 text-secondary cursor-pointer"
                    onClick={openSideBar}
                />
            )}

            <animated.main
                className="w-screen md:w-[400px] h-screen bg-primary px-2 pb-2 pt-1 text-secondary hidden"
                style={sidebarAnimation}
                ref={mainSideBar}
            >
                <header className="flex justify-between items-center">
                    <Icon
                        icon="tabler:layout-sidebar-left-expand-filled"
                        className="h-6 w-6 text-secondary cursor-pointer"
                        onClick={closeSideBar}
                    />
                    <div className="flex items-center">
                        <img src={userInfo.avatar} alt={userInfo.name} className="rounded-full h-8 w-8" />
                        <h2 className="text-fsm">{userInfo.name}</h2>
                    </div>
                </header>
            </animated.main>
        </>
    );
}

// check if the url is a repo
const isRepo = window.location.href.match('https://github.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+(/.*)?');

// attach content if it's a repo
if (isRepo !== null) {
    const app = document.createElement('section');
    app.id = 'my-extension-root';
    app.className = 'fixed right-3 top-28 z-30';

    let elementToAttach;
    if (document.body.firstElementChild === undefined || document.body.firstElementChild === null) {
        elementToAttach = document.body;
    } else {
        elementToAttach = document.body.firstElementChild;
    }

    elementToAttach.className = 'relative';
    elementToAttach.appendChild(app);

    const root = createRoot(app);

    root.render(<Main />);
}
