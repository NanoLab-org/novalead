// Copies MapLibre's Web Worker (+ the shared chunk it imports) into /public so
// they can be served from a stable, relative URL.
//
// Why: MapLibre derives its worker URL as a sibling of its own bundled module
// (new URL("./maplibre-gl-worker.mjs", import.meta.url)). Turbopack does not
// emit the worker next to the bundled chunk, so that URL 404s, the worker never
// starts, and NO vector tiles or glyphs are ever fetched (map stays blank).
// We copy the worker + its `./maplibre-gl-shared.mjs` import here and point
// setWorkerUrl() at "/maplibre/maplibre-gl-worker.mjs" instead.
//
// Regenerated on `predev` / `prebuild`, so it always matches the installed
// maplibre-gl version. Output is gitignored.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "maplibre-gl", "dist");
const dest = join(root, "public", "maplibre");

const files = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

mkdirSync(dest, { recursive: true });
for (const file of files) {
  cpSync(join(src, file), join(dest, file));
}
console.log(`[sync-maplibre-worker] copied ${files.length} files to public/maplibre`);
