import fs from "node:fs";
import { PNG } from "pngjs";

const input = "public/assets/chicken-master-logo-source.png";
const output = "public/assets/chicken-master-logo-transparent.png";
const png = PNG.sync.read(fs.readFileSync(input));
const { width, height, data } = png;
const visited = new Uint8Array(width * height);
const queue = [];

function idx(x, y) {
  return y * width + x;
}

function px(i) {
  const p = i << 2;
  return [data[p], data[p + 1], data[p + 2]];
}

function isBackground(i) {
  const [r, g, b] = px(i);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const bright = (r + g + b) / 3;
  return bright > 168 && max - min < 34;
}

function push(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = idx(x, y);
  if (!visited[i] && isBackground(i)) {
    visited[i] = 1;
    queue.push([x, y]);
  }
}

for (let x = 0; x < width; x += 1) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y += 1) {
  push(0, y);
  push(width - 1, y);
}

for (let head = 0; head < queue.length; head += 1) {
  const [x, y] = queue[head];
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = idx(x, y);
    const [r, g, b] = px(i);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const bright = (r + g + b) / 3;
    const lowSatBackground = bright > 142 && max - min < 58;
    if (!visited[i] && !lowSatBackground) continue;
    const p = i << 2;
    data[p + 3] = 0;
  }
}

fs.writeFileSync(output, PNG.sync.write(png));
