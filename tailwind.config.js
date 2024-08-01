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
				accent: '#38b000'
			}
		}
	},
	plugins: []
};
