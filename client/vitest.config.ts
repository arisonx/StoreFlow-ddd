import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    onConsoleLog(log, type) {
      console.log(`${log}: ${type}`)
    },
    dangerouslyIgnoreUnhandledErrors: true,
  },
})
