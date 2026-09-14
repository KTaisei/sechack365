import type { ComponentProps } from 'react';
import { siteHref } from '../lib/base-path';

type BaseLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string };

export default function BaseLink({ href, ...props }: BaseLinkProps) {
  return <a href={siteHref(href)} {...props} />;
}
