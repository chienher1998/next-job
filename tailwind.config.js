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
			'dracula',
			{
				bumblebee: {
					...require('daisyui/src/colors/themes')['[data-theme=bumblebee]'],
					background: '#fffbeb',
					input : {
						background :'#fae8a5',
					},
					textarea :{
						background : '#fae8a5'
					}
				},
			},
		],
	},
};
