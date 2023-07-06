import { useContext } from 'react';
import { ReactionContext } from '@reaction/context';
import { Popover, Button } from '@jdesignlab/react';
import { useCreateMutation } from '../hooks/useCreateMutation';

export const EmojiAddPopup = ({
  currentUser
}: {
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
}) => {
  const emojiDefaultSet = ['😀', '🤩', '😳', '😢', '😍'];

  const { originId } = useContext(ReactionContext);
  const { onSubmit } = useCreateMutation(originId, currentUser?.uid);
  const createEmojiHandle = (value: string) => {
    onSubmit(value);
  };
  return (
    // <div>
    <Popover placement="top">
      <Popover.Trigger>
        {/* <Button
            variant="outline"
            color="blue-lighten2"
            className="emojiPopoverTrigger"
            // css={{ width: '16px', borderRadius: '14px', border: 'none', background: '#f0f0f0', color: 'black' }}
            // css={{ borderRadius: '16px', color: 'black', border: 'solid black 1px' }}
            style={{ width: '15px', height: '52px', borderRadius: '50%' }}
          >
            <div css={{ fontSize: '20px', lineHeight: '0.1' }}>😀</div>
          </Button> */}
        <div css={{ fontSize: '20px', lineHeight: '1.7', cursor: 'pointer' }}>😀</div>
      </Popover.Trigger>
      <Popover.Content>
        {emojiDefaultSet.map((emoji: string, index: number) => (
          <Button
            key={emoji}
            className={`new-emoji-${index + 1}`}
            variant="ghost"
            onClick={() => createEmojiHandle(emoji)}
            style={{ padding: '11px' }}
          >
            <div css={{ fontSize: '22px' }}>{emoji}</div>
          </Button>
        ))}
      </Popover.Content>
    </Popover>
    // </div>
  );
};
