import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";
const dotEnvReplacement = (envSource) => {
    const replacements = Object.entries(envSource).reduce((obj, [key, val]) => {
        obj[`process.env.${key}`] = `"${val}"`;
        return obj;
    }, {});

    return {
        name: "dotenv-replacement",
        config(obj) {
            obj.define = obj.define || {};
            Object.assign(obj.define, replacements);
        },
    };
};
const path = require("path");
export default defineConfig(({ mode }) => {
    // checking the mode is production or not
    const env =
        mode === "production"
            ? dotenv.config({ path: "./.env.prod" }).parsed
            : dotenv.config().parsed;
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "~bootstrap": "bootstrap",
            },
        },
        css: {
            preprocessorOptions: { scss: { charset: false } },
        },
        plugins: [react(), eslintPlugin(), dotEnvReplacement(env), svgr()],
    };
});
