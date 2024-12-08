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
				accent: '#32852E',
				border: '#d4d4d4',
				mute: '#757575',
				dark: '#171717'
			}
		}
	},
	plugins: []
};
