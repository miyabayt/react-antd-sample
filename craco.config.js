const path = require('node:path')

module.exports = {
  babel: {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
      '@babel/preset-typescript',
    ],
    plugins: ['@emotion/babel-plugin'],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      testEnvironment: 'node',
      moduleNameMapper: {
        '^axios$': 'axios/dist/node/axios.cjs',
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
}
