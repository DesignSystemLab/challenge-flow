import { useEffect } from 'react';
import { suggestionAsideStyle, suggestionHeaderStyle } from '@challenge/styles/suggestionStyle';
import { Text } from '@jdesignlab/react';

export const Suggestion = () => {
  useEffect(() => {}, []);
  return (
    // <div style={suggestionWrapper}>
    <aside css={{ ...suggestionAsideStyle, position: 'sticky' }}>
      <div css={suggestionHeaderStyle}>
        <Text variant="heading">이런 챌린지도 추천해요!</Text>
      </div>
      <ol css={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
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
    // </div>
  );
};
