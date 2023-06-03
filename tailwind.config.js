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
					accent: '#BD93F9',
					 //custom color for job title
					 header: {
						background :'#282A36'
					 },
					 main:{
						background: 'gradient-to-r from-violet-900 to-fuchsia-900'
					 }
				}
			},
			{
				bumblebee: {
					...require('daisyui/src/colors/themes')['[data-theme=bumblebee]'],
					header: {
						background :'#FFFBEB'
					 },
					background: '#fffbeb',
					neutral: '#fcf5d9',
					accent: '#E0A82E',
					
					input: {
						background: '#FFFBEB'
					},
					textarea: {
						background: '#FFFBEB'
					}
				}
			}
		]
	}
};
