import React from 'react';
import { createRoot } from 'react-dom/client';
import OnBoarding from './OnBoarding';

const Index = () => <OnBoarding />;

const root = createRoot(document.getElementById('display-container')!);
root.render(<Index />);
