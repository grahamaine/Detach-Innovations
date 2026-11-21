// Fills {{key}} placeholders in src/ from site.config.json and writes dist/.
// Change the business name, phone, email etc. in site.config.json only.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const cfg = JSON.parse(readFileSync("site.config.json", "utf8"));
const TEXT = new Set([".html", ".css", ".js", ".xml", ".txt", ".json", ".webmanifest"]);

rmSync("dist", { recursive: true, force: true });

function walk(from, to) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    const src = join(from, name), dst = join(to, name);
    if (statSync(src).isDirectory()) { walk(src, dst); continue; }
    if (TEXT.has(extname(name))) {
      const out = readFileSync(src, "utf8").replace(/\{\{(\w+)\}\}/g, (m, k) => {
        if (!(k in cfg)) throw new Error(`Missing "${k}" in site.config.json (used in ${src})`);
        return cfg[k];
      });
      writeFileSync(dst, out);
    } else copyFileSync(src, dst);
  }
}
walk("src", "dist");
console.log(`Built dist/ for ${cfg.brand}`);
