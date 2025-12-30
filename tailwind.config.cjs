/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E2BFF",
                black: "#000000",
                'near-black': "#0B0B0B",
                charcoal: "#111111",
                white: "#FFFFFF",
                muted: "#4A4A4A",
                divider: "#E5E5E5",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
