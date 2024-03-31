import {defineConfig} from "tsup"

export default defineConfig({
    format: ["esm", "cjs"],
    entry: ["src/index.ts"],
    dts: true,
    // shims: true,
    // skipNodeModulesBundle: true,
    minify: true,
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: true,
    bundle: true,
    clean: true,
    treeshake: true,
})