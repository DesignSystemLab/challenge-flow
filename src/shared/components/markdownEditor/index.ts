import dynamic from 'next/dynamic';

export const MarkdownEditor = dynamic(() => import('./Markdown'), { ssr: false });
