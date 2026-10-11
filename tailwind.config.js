/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
            rawon: {
                primary: '#4F46E5',
                info: '#2563EB',
                success: '#15803D',
                warning: '#B45309',
                danger: '#DC2626',
                },
            },
        },
    },
    plugins: [],
}