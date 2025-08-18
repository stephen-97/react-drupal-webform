import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.tsx"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
        // On dit à tsup : "ne bundle pas ces fichiers, laisse le projet hôte les gérer"
        "**/*.scss"
    ],
    esbuildOptions(options) {
        // important pour que esbuild ignore .scss sans planter
        options.loader = {
            ...options.loader,
            ".scss": "empty", // remplace par un objet vide côté Node
        };
    },
});
