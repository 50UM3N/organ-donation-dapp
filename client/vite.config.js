import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";
const dotEnvReplacement = (env) => {
    let newProcess = { env: env };
    return {
        name: "dotenv-replacement",
        config(obj) {
            obj.define = obj.define || {};
            Object.assign(obj.define, { process: newProcess });
        },
    };
};
const path = require("path");
export default defineConfig(({ mode }) => {
    // checking the mode is production or not
    let env =
        mode === "production"
            ? dotenv.config({ path: "./.env.prod" }).parsed
            : dotenv.config().parsed;
    env = { ...process.env, ...env };
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "~bootstrap": "bootstrap",
                web3: path.resolve(
                    __dirname,
                    "./node_modules/web3/dist/web3.min.js"
                ),
            },
        },
        css: {
            preprocessorOptions: { scss: { charset: false } },
        },

        plugins: [react(), eslintPlugin(), dotEnvReplacement(env), svgr()],
    };
});
