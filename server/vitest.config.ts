import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Ativa o uso das funções globais, como `expect`, `describe`, etc.
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
