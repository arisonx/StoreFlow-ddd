import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.integration.spec.ts'],
  },
  resolve: {
    alias: {
      '@infra': '/src/infra',
      '@domain': '/src/domain',
      '@application': '/src/application',
      '@test': '/test',
      '@utils': '/src/utils',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
