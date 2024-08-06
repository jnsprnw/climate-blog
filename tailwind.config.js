/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Untitled Sans', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
			serif: ['Charter', 'Georgia', 'Times New Roman', 'serif']
		},
		extend: {
			colors: {
				accent: '#41AE3C',
				border: '#d4d4d4',
				mute: '#a3a3a3',
				dark: '#171717'
			}
		}
	},
	plugins: []
};
