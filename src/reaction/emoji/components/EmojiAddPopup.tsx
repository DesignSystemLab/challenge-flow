import { useContext } from 'react';
import { resetQueryCache } from '@reaction/comment/utils/resetQueryCache';
import { EMOJI_LIST } from '@reaction/constants';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { ReactionContext } from '@reaction/context';
import { Popover, Button } from '@jdesignlab/react';
import { useCreateMutation } from '../hooks/useCreateMutation';
import { checkAlreadyClicked } from '../utils/checkAlreadyClicked';
import { popoverButton, popoverButtonContent } from '../styles/emojiStyle';
import { EmojiAddPopupProps } from '../types/componentProps';

export const EmojiAddPopup = ({ emojiList }: EmojiAddPopupProps) => {
  const { currentUser } = useContext(ReactionContext);
  const emojiDefaultSet = ['😀', '🤩', '😳', '😢', '😍'];

  const { originId } = useContext(ReactionContext);
  const successAction = () => {
    resetQueryCache(EMOJI_LIST, originId);
  };
  const { onSubmit } = useCreateMutation(originId, currentUser?.uid, successAction);
  const createEmojiHandle = (value: string) => {
    onSubmit(value);
  };

  return (
    <Popover placement="top">
      <Popover.Trigger>
        <Chip clickable>😀</Chip>
      </Popover.Trigger>
      <Popover.Content>
        {emojiDefaultSet.map(
          (emoji: string) =>
            !checkAlreadyClicked(currentUser?.uid, emojiList, emoji) && (
              <Button key={emoji} onClick={() => createEmojiHandle(emoji)} variant="ghost" css={popoverButton}>
                <div css={popoverButtonContent}>{emoji}</div>
              </Button>
            )
        )}
      </Popover.Content>
    </Popover>
  );
};
