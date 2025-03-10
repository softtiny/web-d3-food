import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs-extra'
const copyMonoFoodPlugin = {
  name: 'copy-mono-food',
  writeBundle: async () => {
    await fs.copy('momo_food', 'dist/momo_food')
  }
}
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './index.html', // default
      },
    },
  },
  plugins: [copyMonoFoodPlugin,],
})