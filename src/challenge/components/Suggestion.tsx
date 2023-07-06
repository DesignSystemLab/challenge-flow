import { memo, useEffect } from 'react';
import {
  suggestListWrapperStyle,
  suggestionAsideStyle,
  suggestionHeaderStyle
} from '@challenge/styles/suggestionStyle';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { useReadListQuery } from '@challenge/hooks/useReadQuery';
import { Text } from '@jdesignlab/react';

export const Suggestion = memo(() => {
  const { data } = useReadListQuery();
  useEffect(() => {
    console.log('suggestion');
  });
  return (
    // <div style={suggestionWrapper}>
    <aside css={{ ...suggestionAsideStyle, position: 'sticky' }}>
      <div css={suggestionHeaderStyle}>
        <Text variant="label">이런 챌린지도 추천해요!🔥</Text>
      </div>
      <ol css={suggestListWrapperStyle}>
        {data?.map((post: ChallengeModifyFetchProps, index: number) => (
          <li key={post.id}>
            <Text variant={index === 0 ? 'heading' : 'label'} size="md" truncate>
              {`${index + 1}`}. {post.title}
            </Text>
          </li>
        ))}
      </ol>
    </aside>
    // </div>
  );
});
