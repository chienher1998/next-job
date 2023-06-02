/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography'), require('flowbite/plugin')],
	daisyui: {
		themes: [
			{
				dracula: {
					...require('daisyui/src/colors/themes')['[data-theme=dracula]'],
					accent: '#BD93F9' //custom color for job title
				}
			},
			{
				bumblebee: {
					...require('daisyui/src/colors/themes')['[data-theme=bumblebee]'],
					background: '#fffbeb',
					neutral: '#fcf5d9',
					accent: '#E0A82E',
					input: {
						background: '#fff4cc'
					},
					textarea: {
						background: '#fae8a5'
					}
				}
			}
		]
	}
};
