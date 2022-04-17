import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import * as dotenv from "dotenv";
import svgr from "@honkhonk/vite-plugin-svgr";
import * as path from "path";

const dotEnvReplacement = (env) => {
    const newProcess = { env: env };
    return {
        name: "dotenv-replacement",
        config(obj) {
            obj.define = obj.define || {};
            Object.assign(obj.define, { process: newProcess });
        },
    };
};
export default defineConfig(({ mode }) => {
    // checking the mode is production or not
    let env = mode === "production" ? dotenv.config({ path: "./.env.prod" }).parsed : dotenv.config().parsed;
    env = { ...process.env, ...env };
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "~bootstrap": "bootstrap",
                web3: path.resolve(__dirname, "./node_modules/web3/dist/web3.min.js"),
            },
        },
        css: {
            preprocessorOptions: { scss: { charset: false } },
        },

        plugins: [react(), eslintPlugin(), dotEnvReplacement(env), svgr()],
    };
});
