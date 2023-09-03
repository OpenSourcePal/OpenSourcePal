import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './components/Popup';

import '../assets/css/tailwind.css';

const Index = () => <Popup />;

const root = ReactDOM.createRoot(document.getElementById('display-container')!);
root.render(<Index />);
