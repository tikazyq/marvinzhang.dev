import React, { type ReactNode } from 'react';
import OriginalInfo from '@theme-original/BlogPostItem/Header/Info';
import type { Props } from '@theme/BlogPostItem/Header/Info';
import { useLocation } from '@docusaurus/router';
import WeChatCopyButton from '@site/src/components/WeChatCopyButton';

export default function BlogPostItemHeaderInfo(props: Props): ReactNode {
  const { pathname } = useLocation();

  // Only show on individual blog post pages (not listing pages)
  // Blog post paths: /blog/<slug> or /zh/blog/<slug>
  const blogMatch = pathname.match(/^\/(?:zh\/)?blog\/([^/]+)\/?$/);
  const slug = blogMatch?.[1];

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0' }}>
      <OriginalInfo {...props} />
      {slug && (
        <span style={{ marginLeft: '4px' }}>
          <WeChatCopyButton slug={slug} />
        </span>
      )}
    </div>
  );
}
