import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',  // Include TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
