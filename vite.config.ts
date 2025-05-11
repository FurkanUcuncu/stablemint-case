import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(
      {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes('-')
          }
        }
      }),
      tailwindcss(),
  ],
  build: {
      lib: {
          entry: 'src/payment-widget-furkan.ce.ts',
          name: 'PaymentWidgetFurkan',
          formats: ['es', 'umd'],
      },
      rollupOptions: {
          external: ['vue'], // Make sure to externalize Vue as it's not bundled
          output: [
              {
                  format: 'umd',
                  entryFileNames: 'payment-widget-furkan.umd.js',
                  name: 'PaymentWidgetFurkan', // 👈 REQUIRED for UMD
                  globals: {
                      vue: 'Vue',
                  },
              },
              {
                  format: 'es',
                  entryFileNames: 'payment-widget-furkan.esm.js',
              },
          ],
      }
  }
})
