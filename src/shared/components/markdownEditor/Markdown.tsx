import { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { Loading } from '@shared/components/Icons';
import { markdownWrap, markdownSection, previewSection } from './markdownStyle';

const UiwMarkdown = dynamic(() => import('@uiw/react-md-editor'), { ssr: false, loading: () => <Loading /> });
const Priview = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false, loading: () => <Loading /> }
);

type Content = string | undefined;

interface MarkdownProps {
  onChange?: (content: string | undefined) => void;
  preview?: boolean;
  contents?: string;
  height?: number;
}
export const MarkdownEditor = (props: MarkdownProps) => {
  const { contents, onChange, preview = false, height = 720 } = props;
  const previewMode = preview ? 'preview' : 'edit';
  const [content, setContent] = useState<Content>(contents || '');

  const onMarkdownChange = (content: Content) => {
    if (onChange) {
      onChange(content);
    }
    setContent(content);
  };

  return (
    <div css={markdownWrap}>
      <section role="textbox" css={markdownSection}>
        <UiwMarkdown
          value={content}
          onChange={onMarkdownChange}
          extraCommands={[]}
          preview={previewMode}
          height={height}
        />
      </section>
      {!preview && (
        <article role="article" css={previewSection(height)}>
          <Priview source={content} />
        </article>
      )}
    </div>
  );
};
