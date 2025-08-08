import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for large dependencies
          vendor: ['react', 'react-dom'],
          // UI components chunk
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu'],
          // Icons and graphics
          icons: ['lucide-react', '@fortawesome/react-fontawesome', '@fortawesome/fontawesome-svg-core'],
          // Animation and motion
          animation: ['framer-motion'],
          // Utilities and forms
          utils: ['class-variance-authority', 'clsx', 'tailwind-merge', 'react-hook-form', 'zod'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
