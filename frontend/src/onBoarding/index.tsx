import React from 'react';
import ReactDOM from 'react-dom/client';
import OnBoarding from './components/OnBoarding';

import '../assets/css/tailwind.css';

const Index = () => <OnBoarding />;

const root = ReactDOM.createRoot(document.getElementById('display-container')!);
root.render(<Index />);
