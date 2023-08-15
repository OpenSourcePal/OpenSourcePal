/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				darkest: 'rgba(20, 29, 44, 100)',
				dark: 'rgba(20, 29, 44, 80)',
				'mid-dark': 'rgba(20, 29, 44, 60)',
				'mid-light': 'rgba(20, 29, 44, 50)',
				light: 'rgba(20, 29, 44, 30)',
				lighest: 'rgba(20, 29, 44, 10)',
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
