/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslint(),
		svgr({
			include: '**/*.svg',
			svgrOptions: {
				exportType: 'default',
			},
		}),
		eslint({
			exclude: ['/virtual:/**', 'node_modules/**'],
		}),
		checker({
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
	},
})
