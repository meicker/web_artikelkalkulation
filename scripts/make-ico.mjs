// Packs PNG icons into a favicon.ico (PNG-compressed ICO, supported by all modern browsers).
// Run: node scripts/make-ico.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sizes = [16, 32, 48];
const imgs = sizes
  .map((sz) => {
    try {
      return { sz, data: readFileSync(resolve(root, `docs/assets/img/favicon-${sz}.png`)) };
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type = icon
header.writeUInt16LE(imgs.length, 4); // image count

let offset = 6 + imgs.length * 16;
const dir = Buffer.concat(
  imgs.map(({ sz, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sz >= 256 ? 0 : sz, 0); // width
    e.writeUInt8(sz >= 256 ? 0 : sz, 1); // height
    e.writeUInt8(0, 2); // palette colors
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8); // image size
    e.writeUInt32LE(offset, 12); // offset
    offset += data.length;
    return e;
  })
);

const ico = Buffer.concat([header, dir, ...imgs.map((i) => i.data)]);
writeFileSync(resolve(root, "docs/favicon.ico"), ico);
console.log(`✓ docs/favicon.ico (${imgs.map((i) => i.sz).join(", ")} px, ${ico.length} bytes)`);
