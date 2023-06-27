import { useEffect } from 'react';
import {
  suggestListWrapperStyle,
  suggestionAsideStyle,
  suggestionHeaderStyle
} from '@challenge/styles/suggestionStyle';
import { Text } from '@jdesignlab/react';

export const Suggestion = () => {
  useEffect(() => {}, []);
  return (
    <aside css={suggestionAsideStyle}>
      <div css={suggestionHeaderStyle}>
        <Text variant="heading">이런 챌린지도 추천해요!</Text>
      </div>
      <ol css={suggestListWrapperStyle}>
        <li>
          <Text variant="heading" size="md" truncate>
            1. blagkaglasglsdkfjsadfkblagkaglasglsdkfjsadfk
          </Text>
        </li>
        <li>2. blagkaglasglsdkfjsadfk</li>
        <li>3. blagkaglasglsdkfjsadfk</li>
        <li>4. blagkaglasglsdkfjsadfk</li>
        <li>5. blagkaglasglsdkfjsadfk</li>
        <li>6. blagkaglasglsdkfjsadfk</li>
        <li>7. blagkaglasglsdkfjsadfk</li>
        <li>8. blagkaglasglsdkfjsadfk</li>
        <li>9. blagkaglasglsdkfjsadfk</li>
      </ol>
    </aside>
  );
};
