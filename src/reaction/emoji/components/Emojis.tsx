import { useContext } from 'react';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { ReactionContext } from '@reaction/context';
import { EmojiAddPopup } from './EmojiAddPopup';
import { EmojiList } from './EmojiList';
import { useReadListQuery } from '../hooks/useReadQuery';

export const Emojis = () => {
  const { originId, domain } = useContext(ReactionContext);
  const { data } = useReadListQuery(domain, originId);

  return (
    <Layout.Row>
      <EmojiAddPopup emojiList={data} />
      <EmojiList emojiList={data} />
    </Layout.Row>
  );
};
