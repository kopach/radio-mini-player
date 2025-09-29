/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bar-pulse': 'bar-pulse 0.6s ease-in-out infinite',
        'bar-pulse-delay-0': 'bar-pulse 0.6s ease-in-out infinite 0s',
        'bar-pulse-delay-1': 'bar-pulse 0.6s ease-in-out infinite 0.1s',
        'bar-pulse-delay-3': 'bar-pulse 0.6s ease-in-out infinite 0.3s',
        'bar-pulse-delay-4': 'bar-pulse 0.6s ease-in-out infinite 0.4s',
      },
      keyframes: {
        'bar-pulse': {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
};
