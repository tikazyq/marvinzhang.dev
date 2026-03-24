import React, { type ReactNode } from 'react';
import OriginalInfo from '@theme-original/BlogPostItem/Header/Info';
import type { Props } from '@theme/BlogPostItem/Header/Info';

export default function BlogPostItemHeaderInfo(props: Props): ReactNode {
  return <OriginalInfo {...props} />;
}
