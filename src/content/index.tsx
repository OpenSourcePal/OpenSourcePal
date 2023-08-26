import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { runtime } from 'webextension-polyfill';

import { gettingUserInfo, retrieveAccessToken } from 'utils/helper';
import '../assets/css/tailwind.css';

function Main() {
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        name: '',
        avatar: '',
        url: '',
    });
    useEffect(() => {
        const getToken = async () => {
            const accessToken = await retrieveAccessToken();
            gettingUserInfo(accessToken, setUserInfo);
        };
        getToken();
    });

    const openSideBar = () => {
        alert('SideBar Opened');
    };
    return (
        <div className=" ">
            <Icon icon="bxs:door-open" className="h-10 w-10 text-mid-light cursor-pointer" onClick={openSideBar} />
        </div>
    );
}

// check if the url is a repo
const isRepo = window.location.href.match('https://github.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+(/.*)?');

alert(isRepo);
// attach content if it's a repo
if (isRepo !== null) {
    const app = document.createElement('div');
    app.id = 'my-extension-root';
    app.className = 'absolute right-3 top-28';

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
