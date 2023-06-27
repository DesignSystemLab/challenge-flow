import { useContext } from 'react';
import { Popover, Button } from '@jdesignlab/react';
import { useCreateEmoji } from '../hooks/useCreateEmoji';
import { ReactionContext } from '../context';

export const EmojiAdd = ({ userId }: { userId: string | undefined }) => {
  const emojiDefaultSet = ['😀', '🤩', '😳', '😢', '😍'];
  const { originId } = useContext(ReactionContext);
  const { onSubmit } = useCreateEmoji(originId, userId as string);
  const createEmojiHandle = (value: string) => {
    onSubmit(value);
  };
  return (
    <div>
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
          <div css={{ fontSize: '20px' }}>😀</div>
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
    </div>
  );
};
