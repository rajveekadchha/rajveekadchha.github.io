// After `next build`: for every page like out/work.html that also has an
// out/work/ folder (Next puts prefetch data there), copy the page to
// out/work/index.html. GitHub Pages can then serve /work whether it picks the
// .html file or redirects to the folder (/work/), so neither path 404s.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const out = new URL("../out/", import.meta.url).pathname;
let copied = 0;
for (const name of readdirSync(out)) {
  if (!name.endsWith(".html") || name === "index.html" || name === "404.html") continue;
  const dir = join(out, name.slice(0, -5));
  if (existsSync(dir) && statSync(dir).isDirectory()) {
    copyFileSync(join(out, name), join(dir, "index.html"));
    copied++;
  }
}
console.log(`pages-fallback: added index.html to ${copied} page folders`);
