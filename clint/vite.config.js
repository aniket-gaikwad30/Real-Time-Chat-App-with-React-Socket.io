import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// import { defineConfig } from "vite";

// export default defineConfig({
//   server: {
//     host: "0.0.0.0",
//     port: 5173,
//     strictPort: true,
//     hmr: {
//       clientPort: 443, // Needed for ngrok
//     },
//     allowedHosts: [
//       "042f-2409-40c2-4042-b3a4-84cd-fdd1-bdcb-f41f.ngrok-free.app", // Add your ngrok URL here
//     ],
//   },
// });
