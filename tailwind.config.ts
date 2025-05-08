/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './assets/**/*.{vue,js,ts}'
    ],
    theme: {
        extend: {
            colors: {
                'gray-900': '#111820',
                'green-500': '#00C805',
                'gray-400': '#A0AEC0',
                'gray-100': '#F7FAFC'
            }
        }
    },
    plugins: []
}