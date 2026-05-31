// Erzeugt die App-Icons (Kirschblüte auf warmem Verlauf) ohne externe Libs.
// Reines RGBA-Rendering mit 3x-Supersampling + PNG-Encoding über zlib.
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

function lerp(a, b, t) { return a + (b - a) * t; }

// Petal-/Mittelpunkt-Geometrie relativ zur Kantenlänge S.
function sampleColor(x, y, S) {
  const cx = S / 2, cy = S / 2;
  // Hintergrund: warmer vertikaler Verlauf (#d4693a -> #b8501f)
  const t = y / S;
  let r = lerp(212, 184, t), g = lerp(105, 80, t), b = lerp(58, 31, t);

  const px = x - cx, py = y - cy;
  const d = 0.20 * S, RX = 0.12 * S, RY = 0.185 * S;
  let onPetal = false, onEdge = false;
  for (let i = 0; i < 5; i++) {
    const ang = (i * 72) * Math.PI / 180; // 0 = nach oben
    // Pixel um -ang drehen, dann gegen "oben zeigendes" Blütenblatt testen
    const lx = px * Math.cos(-ang) - py * Math.sin(-ang);
    const ly = px * Math.sin(-ang) + py * Math.cos(-ang);
    const v = (lx / RX) ** 2 + ((ly + d) / RY) ** 2;
    if (v <= 1) { onPetal = true; if (v > 0.80) onEdge = true; }
  }
  if (onPetal) {
    if (onEdge) { r = 242; g = 184; b = 205; }   // #F2B8CD Rand
    else { r = 255; g = 221; b = 232; }            // #FFDDE8 Blütenblatt
  }
  // Gelbe Mitte
  const cr = Math.sqrt(px * px + py * py);
  if (cr <= 0.095 * S) { r = 255; g = 207; b = 63; } // #FFCF3F
  return [r, g, b];
}

function render(size) {
  const SS = 3, H = size * SS;
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let R = 0, G = 0, B = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const [r, g, b] = sampleColor(
            (x * SS + sx + 0.5) / SS, (y * SS + sy + 0.5) / SS, size
          );
          R += r; G += g; B += b;
        }
      }
      const n = SS * SS, o = (y * size + x) * 4;
      out[o] = Math.round(R / n);
      out[o + 1] = Math.round(G / n);
      out[o + 2] = Math.round(B / n);
      out[o + 3] = 255;
    }
  }
  return out;
}

function encodePNG(rgba, w, h) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // Filter: none
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const comp = zlib.deflateSync(raw, { level: 9 });
  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, "ascii");
    const body = Buffer.concat([t, data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body) >>> 0, 0);
    return Buffer.concat([len, body, crc]);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr), chunk("IDAT", comp), chunk("IEND", Buffer.alloc(0)),
  ]);
}

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

const dir = path.resolve(__dirname, "..");
for (const size of [180, 192, 512]) {
  const png = encodePNG(render(size), size, size);
  fs.writeFileSync(path.join(dir, `icon-${size}.png`), png);
  console.log(`icon-${size}.png ${png.length} bytes`);
}
