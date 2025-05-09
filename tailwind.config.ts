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
                'dark-900': '#0A0A0A',
                'purple-500': '#b76bff',
                'gray-800': '#43455c'
            }
        }
    },
    plugins: []
}