import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { runtime } from 'webextension-polyfill';
import MessageListener from './messageListener';

console.log('Content Script');
function Main() {
    useEffect(() => {
        runtime.onMessage.addListener(MessageListener);
    }, []);

    return (
        <div className="my-extension">
            <h1>Hello world - Welcome to Open Source</h1>
        </div>
    );
}

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);

const root = createRoot(app);

root.render(<Main />);
