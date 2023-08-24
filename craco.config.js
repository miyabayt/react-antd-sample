const path = require('path');

module.exports = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "@emotion/react" },
      ],
    ],
    plugins: ["@emotion/babel-plugin"],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
};