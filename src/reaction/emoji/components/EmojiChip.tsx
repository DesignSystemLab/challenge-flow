import { useContext } from 'react';
import { EMOJI_LIST } from '@reaction/constants';
import { resetQueryCache } from '@reaction/comment/utils/resetQueryCache';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { ReactionContext } from '@reaction/context';
import { Tooltip } from '@jdesignlab/react';
import { useCreateMutation } from '../hooks/useCreateMutation';
import { useDeleteMutation } from '../hooks/useDeleteMutation';
import { getReactedEmojiId } from '../utils/getReactedEmojiId';
import { getTooltipString } from '../utils/getTooltipString';
import { chipCount, chipEmoji } from '../styles/emojiStyle';
import { EmojiChipProps } from '../types/componentProps';
import { EmojiDataWithId } from '../types/data';

export const EmojiChip = ({ emojiList, emoji, value }: EmojiChipProps) => {
  const { currentUser, originId } = useContext(ReactionContext);
  const firstUser = emojiList?.find((emojiData: EmojiDataWithId) => emojiData.emoji === emoji);
  const { userInfo } = useGetUserInfoById(firstUser?.userId);

  const successAction = () => {
    resetQueryCache(EMOJI_LIST, originId);
  };
  const { onSubmit } = useCreateMutation(originId, currentUser?.uid, successAction);
  const { onDelete } = useDeleteMutation(successAction);

  const toggleEmoji = (emojiKey: string, values: EmojiDataWithId[]) => {
    const reactedEmojiId = getReactedEmojiId(values, currentUser?.uid);
    if (reactedEmojiId) {
      onDelete(reactedEmojiId);
    } else {
      onSubmit(emojiKey);
    }
  };

  return (
    <Tooltip>
      <Tooltip.Content>{getTooltipString(userInfo, emoji, value)}</Tooltip.Content>
      <Tooltip.Target>
        <Chip
          as="button"
          onClick={() => toggleEmoji(emoji, value)}
          color="#4695E5"
          size="md"
          key={emoji}
          clickable={!!currentUser?.uid}
        >
          <span className="emoji" css={chipEmoji}>
            {emoji}
          </span>
          <span className="count" css={chipCount}>
            {value.length}
          </span>
        </Chip>
      </Tooltip.Target>
    </Tooltip>
  );
};
