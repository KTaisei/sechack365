import { rename, rmdir } from 'node:fs/promises';
import { join } from 'node:path';

const basePath = process.env.PAGES_BASE_PATH ?? '';

if (basePath) {
  if (!/^\/[A-Za-z0-9._-]+$/.test(basePath)) {
    throw new Error(`Unexpected PAGES_BASE_PATH: ${basePath}`);
  }

  const clientDirectory = join(process.cwd(), 'dist', 'client');
  const nestedDirectory = join(clientDirectory, basePath.slice(1));
  await rename(join(nestedDirectory, '_next'), join(clientDirectory, '_next'));
  await rmdir(nestedDirectory);
  console.log(`Moved ${basePath}/_next to the GitHub Pages artifact root.`);
}
