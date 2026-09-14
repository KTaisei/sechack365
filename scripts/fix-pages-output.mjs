import { copyFile, mkdir, rename, rmdir } from 'node:fs/promises';
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

  const routes = [
    'ai', 'flyer', 'knowledge-graphs', 'poster', 'progress', 'resources', 'technology',
    'topics/diagnosis', 'topics/experiment', 'topics/giad-model', 'topics/goal',
    'topics/ipad-app', 'topics/learning-map', 'topics/next-step', 'topics/problem',
    'topics/schedule', 'topics/system',
  ];

  for (const route of routes) {
    const routeDirectory = join(clientDirectory, route);
    await mkdir(routeDirectory, { recursive: true });
    await copyFile(join(clientDirectory, `${route}.html`), join(routeDirectory, 'index.html'));
    await copyFile(join(clientDirectory, `${route}.rsc`), join(routeDirectory, 'index.rsc'));
  }

  console.log(`Moved ${basePath}/_next to the GitHub Pages artifact root.`);
  console.log(`Created directory-style entry points for ${routes.length} routes.`);
}
