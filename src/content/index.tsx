import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { runtime } from 'webextension-polyfill';

import '../assets/css/tailwind.css';
import { gettingUserInfo, info, retrieveAccessToken } from 'utils/helper';

function Main() {
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        name: '',
        avatar: '',
        url: '',
    });
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        const getToken = async () => {
            const accessToken = await retrieveAccessToken();
            gettingUserInfo(accessToken, setUserInfo);
        };
        getToken();
    });

    const openSideBar = () => {
        alert('opensidebar');
        setIsOpen(true);
    };

    const closeSideBar = () => {
        alert('closesidebar');
        setIsOpen(false);
    };
    return (
        <>
            {!isOpen && (
                <Icon
                    icon="material-symbols:lock-open"
                    className="h-10 w-10 text-mid-light cursor-pointer"
                    onClick={openSideBar}
                />
            )}

            {isOpen && (
                <main className="w-screen md:w-[500px] h-screen bg-lightest p-4">
                    <header className="flex justify-between items-center">
                        <Icon
                            icon="material-symbols:lock"
                            className="h-10 w-10 text-mid-light cursor-pointer"
                            onClick={closeSideBar}
                        />
                        <div className="flex items-center">
                            <img src={userInfo.avatar} alt={userInfo.name} className="rounded-full h-10 w-10" />
                            <h2 className="text-fsm text-black">{userInfo.name}</h2>
                        </div>
                    </header>
                </main>
            )}
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
