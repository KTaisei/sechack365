import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { siteHref } from '../lib/base-path';

export default function BaseLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink href={typeof href === 'string' ? siteHref(href) : href} {...props} />;
}
