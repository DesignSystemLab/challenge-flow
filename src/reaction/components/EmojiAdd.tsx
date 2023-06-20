import { useContext } from 'react';
import { Popover, Button } from '@jdesignlab/react';
import { useCreateEmoji } from '../hooks/useCreateEmoji';
import { ReactionContext } from '../context';

export const EmojiAdd = ({ userId }: { userId: string }) => {
  const emojiDefaultSet = ['😀', '🤩', '😳', '😢', '😍'];
  const { originId } = useContext(ReactionContext);
  const { onSubmit } = useCreateEmoji(originId, userId);
  const createEmojiHandle = (value: string) => {
    onSubmit(value);
  };
  return (
    <div>
      <Popover placement="top">
        <Popover.Trigger>
          <Button color="blue-lighten2" className="emojiPopoverTrigger">
            +
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          {emojiDefaultSet.map((emoji: string, index: number) => (
            <Button
              key={emoji}
              className={`new-emoji-${index + 1}`}
              variant="ghost"
              onClick={() => createEmojiHandle(emoji)}
              style={{ padding: '12px' }}
            >
              {emoji}
            </Button>
          ))}
        </Popover.Content>
      </Popover>
    </div>
  );
};
