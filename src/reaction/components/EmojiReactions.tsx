import { EmojiAdd } from './EmojiAdd';
import { EmojiList } from './EmojiList';

export const EmojiReactions = ({ userId }: { userId: string | undefined }) => (
  <>
    <div css={{ display: 'flex', borderLeft: 'solid black 2px', padding: '8px' }}>
      <EmojiAdd userId={userId} />
      <EmojiList userId={userId} />
    </div>
  </>
);
