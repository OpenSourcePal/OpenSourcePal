/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				darkest: '#5A200C',
				dark: '#9E3715',
				'mid-dark': '#CB471A',
				'mid-light': '#E56134',
				light: '#F0A78E',
				lightest: '#FCEDE8',
			},
			fontSize: {
				f2xs: 'var(--step--2)',
				fxs: 'var(--step--1)',
				fsm: 'var(--step-0)',
				fmd: 'var(--step-1)',
				flg: 'var(--step-2)',
				fxl: 'var(--step-3)',
				f2xl: 'var(--step-4)',
				f3xl: 'var(--step-5)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
