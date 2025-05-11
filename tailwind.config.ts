module.exports = {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern: /^(bg|text|border|p|m|rounded|grid|flex|items|justify|gap)-.*$/,
        },
    ],
};
