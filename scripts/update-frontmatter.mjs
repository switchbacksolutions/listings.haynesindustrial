#!/usr/bin/env node
// update-frontmatter.mjs
// Reads scripts/image-map.json and updates the `images` array in each
// listing's frontmatter to reference the downloaded files.

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const root = new URL('..', import.meta.url).pathname;
const mapPath = join(root, 'scripts/image-map.json');
const listingsDir = join(root, 'src/content/listings');

const imageMap = JSON.parse(readFileSync(mapPath, 'utf-8'));

let updated = 0;
let skipped = 0;

for (const [slug, images] of Object.entries(imageMap)) {
  const filePath = join(listingsDir, `${slug}.md`);

  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`  SKIP: ${slug}.md not found`);
    skipped++;
    continue;
  }

  // Build the new images YAML value
  const imagesYaml = images.length === 0
    ? 'images: []'
    : `images:\n${images.map(p => `  - '${p}'`).join('\n')}`;

  // Replace the existing `images:` line(s) in frontmatter
  const updated_content = content.replace(
    /^images:.*$/m,
    imagesYaml
  );

  if (updated_content === content) {
    console.log(`  UNCHANGED: ${slug}.md`);
    skipped++;
    continue;
  }

  writeFileSync(filePath, updated_content, 'utf-8');
  console.log(`  UPDATED: ${slug}.md (${images.length} image(s))`);
  updated++;
}

console.log(`\nDone. ${updated} file(s) updated, ${skipped} skipped.`);
