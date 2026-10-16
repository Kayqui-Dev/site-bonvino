import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const brand = new URL('../public/brand/', import.meta.url);
const sourcePath = (name) => fileURLToPath(new URL(name, brand));

for (const partner of ['leandro-bonvino', 'denilson-pereira']) {
  for (const width of [320, 480, 768, 1023]) {
    const image = sharp(sourcePath(`socio-${partner}.jpg`)).rotate().resize({ width, withoutEnlargement: true });
    await Promise.all([
      image.clone().webp({ quality: 84, effort: 5 }).toFile(sourcePath(`socio-${partner}-${width}.webp`)),
      image.clone().avif({ quality: 58, effort: 5 }).toFile(sourcePath(`socio-${partner}-${width}.avif`)),
    ]);
  }
}

for (const width of [160, 320]) {
  await sharp(sourcePath('logo-bp.jpg')).resize(width).webp({ quality: 88 }).toFile(sourcePath(`logo-bp-${width}.webp`));
}

const monogram = sharp(sourcePath('logo-bp.jpg')).extract({ left: 92, top: 0, width: 456, height: 456 });
for (const size of [32, 180]) {
  await monogram.clone().resize(size).png().toFile(sourcePath(`icon-${size}.png`));
}

console.log('Imagens responsivas e ícones gerados a partir dos originais, sem alterar as fotografias.');
