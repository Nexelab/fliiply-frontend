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
                'dark-900': '#0A0A0A',  // Noir presque pur pour tous les fonds
                'purple-500': '#6D28D9', // Violet sombre pour les accents
                'gray-800': '#1F2A44'    // Gris foncé inspiré de StockX
            }
        }
    },
    plugins: []
}