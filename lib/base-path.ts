export const basePath = process.env.PAGES_BASE_PATH ?? '';

export function siteHref(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  return `${basePath}${href}`;
}
