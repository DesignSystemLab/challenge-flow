import { useRef, RefObject } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { previewSection } from './markdownStyle';
import { useWindowSize } from '../../hooks/useWindowSize';

interface MarkdownProps {
  onChange?: (content: string) => void;
  viewer?: boolean;
  content?: string;
  height?: number;
  minHeight?: number;
  autoHeight?: boolean;
}

const Markdown = (props: MarkdownProps) => {
  const { content = '', onChange, viewer = false, height, autoHeight = false, minHeight = 310 } = props;
  const editorRef = useRef<Editor>(null);
  const { breakpoint } = useWindowSize();

  const onMarkdownChange = (ref: RefObject<Editor>) => {
    const markdownValue = ref.current?.getInstance().getMarkdown();
    if (onChange) {
      onChange(markdownValue ?? '');
    }
  };

  if (viewer) {
    return (
      <article css={previewSection(height, autoHeight)}>
        <Viewer initialValue={content} plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />
      </article>
    );
  }

  return (
    <section css={{ height, minHeight }} role="textbox">
      <Editor
        ref={editorRef}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        previewStyle={breakpoint === 'sm' ? 'tab' : 'vertical'}
        initialValue={content}
        onChange={() => {
          onMarkdownChange(editorRef);
        }}
        // height="auto"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </section>
  );
};

export default Markdown;
