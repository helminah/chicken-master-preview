import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const assets = [
  "real-menu-1.png",
  "real-menu-2.png",
  "real-burger-double.png",
  "real-mix-bucket.png",
  "real-crispy-chicken.png",
  "real-wings-6.png",
  "real-fries.png",
  "real-chawarma.png",
];

const root = path.resolve("public/assets");

function cutout(file) {
  const input = path.join(root, file);
  const output = path.join(root, file.replace(".png", "-cut.png"));
  const png = PNG.sync.read(fs.readFileSync(input));

  for (let y = 0; y < png.height; y += 1) {
    for (let x = 0; x < png.width; x += 1) {
      const index = (png.width * y + x) << 2;
      const r = png.data[index];
      const g = png.data[index + 1];
      const b = png.data[index + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max - min;
      const bright = (r + g + b) / 3;

      if (bright > 246 && saturation < 18) {
        png.data[index + 3] = 0;
      } else if (bright > 230 && saturation < 28) {
        png.data[index + 3] = Math.min(png.data[index + 3], Math.round((246 - bright) * 14));
      }
    }
  }

  fs.writeFileSync(output, PNG.sync.write(png));
}

assets.forEach(cutout);
