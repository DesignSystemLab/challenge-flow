import { MarkdownEditor } from '@shared/components/markdownEditor';

interface Props {
  content: string;
}

export const PostView = (props: Props) => {
  const { content } = props;
  return <MarkdownEditor viewer content={content} />;
};
