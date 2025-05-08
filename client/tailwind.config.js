/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		keyframes: {
		  fadeIn: {
			'0%': { opacity: 0 },
			'100%': { opacity: 1 },
		  },
		  scaleIn: {
			'0%': { transform: 'scale(0.5)', opacity: 0 },
			'100%': { transform: 'scale(1)', opacity: 1 },
		  },
		},
		animation: {
		  fadeIn: 'fadeIn 0.5s ease-in-out',
		  scaleIn: 'scaleIn 0.4s ease-out forwards',
		},
	  },
	},
	plugins: [],
  };
  