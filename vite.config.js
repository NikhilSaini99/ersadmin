// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import pluginRewriteAll from 'vite-plugin-rewrite-all';



// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(),pluginRewriteAll()],
//   build: {
//     outDir: 'dist'
//   },
//   esbuild: {
//     loader: "tsx", // OR "jsx"
//     include: [
//       // Add this for business-as-usual behaviour for .jsx and .tsx files
//       "src/**/*.jsx",
//       "src/**/*.jx",
//       "node_modules/**/*.jsx",
//       "node_modules/**/*.tsx",

//       // Add the specific files you want to allow JSX syntax in
//       "src/routes/Router.js",

//       // --- OR ---

//       // Add these lines to allow all .js files to contain JSX
//       "src/**/*.js",
//       "node_modules/**/*.js",

//       // Add these lines to allow all .ts files to contain JSX
//       "node_modules/**/*.ts",
//     ],
//   },
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.jsx', // Adjust this entry file based on your project structure
      },
    },
  },
  esbuild: {
    jsxFactory: 'jsx', // Change this to 'React.createElement' if you're using React.createElement syntax
    jsxInject: `import React from 'react';`, // Add this line for React JSX syntax support
  },
});
