import React, { useState, useCallback } from 'react';
import styles from './WeChatCopyButton.module.css';

interface Props {
  slug: string;
}

export default function WeChatCopyButton({ slug }: Props) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'done' | 'error'>('idle');

  const handleCopy = useCallback(async () => {
    setStatus('copying');
    try {
      const res = await fetch(`/wechat/${slug}.html`);
      if (!res.ok) {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
        return;
      }
      const html = await res.text();
      const blob = new Blob([html], { type: 'text/html' });
      const item = new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([html], { type: 'text/plain' }) });
      await navigator.clipboard.write([item]);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, [slug]);

  const label = {
    idle: '复制微信版',
    copying: '复制中...',
    done: '已复制 ✓',
    error: '暂无',
  }[status];

  return (
    <button
      className={`${styles.btn} ${status !== 'idle' ? styles[status] : ''}`}
      onClick={handleCopy}
      disabled={status === 'copying'}
      title="复制微信公众号富文本到剪贴板"
    >
      <WeChatIcon />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

function WeChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.42 6.42 0 0 1-.246-1.777c0-3.577 3.206-6.477 7.156-6.477.282 0 .556.022.829.05C16.647 4.97 13.007 2.188 8.691 2.188zm-2.8 4.17a1.027 1.027 0 1 1 0 2.054 1.027 1.027 0 0 1 0-2.054zm5.612 0a1.027 1.027 0 1 1 0 2.054 1.027 1.027 0 0 1 0-2.054zM24 14.221c0-3.302-3.18-5.982-7.104-5.982-3.926 0-7.104 2.68-7.104 5.982 0 3.303 3.178 5.982 7.104 5.982.67 0 1.32-.084 1.942-.243a.71.71 0 0 1 .59.08l1.563.916a.268.268 0 0 0 .138.045c.133 0 .24-.11.24-.243 0-.06-.024-.118-.04-.176l-.32-1.216a.488.488 0 0 1 .175-.546C22.932 17.871 24 16.173 24 14.221zm-9.468-1.353a.843.843 0 1 1 0 1.686.843.843 0 0 1 0-1.686zm4.726 0a.843.843 0 1 1 0 1.686.843.843 0 0 1 0-1.686z" />
    </svg>
  );
}
