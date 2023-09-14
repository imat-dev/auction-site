import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},

			colors: {
				yellow: '#efcf57',
				brown: '#483e34',
				cream: '#fdf6eb',
				darkcream: '#f2e2c2',
				aqua: '#a0ccba',
				orange: '#db9156',
			},

			fontFamily: {
				heading: ['Spline Sans', 'sans-serif'],
				sans: ['Spline Sans', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'), // Enable the typography plugin
	],
};
export default config;
