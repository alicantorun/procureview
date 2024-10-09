import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    base: "/procureview/", // Add this line
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
