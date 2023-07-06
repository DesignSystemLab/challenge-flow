import { EmojiAddPopup } from './EmojiAddPopup';
import { EmojiList } from './EmojiList';

export const Emojis = ({
  currentUser
}: {
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
}) => (
  <>
    <div css={{ display: 'flex', borderLeft: 'solid black 2px', padding: '8px' }}>
      <EmojiAddPopup currentUser={currentUser} />
      <EmojiList currentUser={currentUser} />
    </div>
  </>
);
