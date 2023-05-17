import styled from '@emotion/styled';
import { Button, ThemeProvider } from '@jdesignlab/react';
import { mediaQuery } from '@shared/styles/mixins/responsive';
import { Post } from '@post/components/Post';
import { css } from '@emotion/react';

const index = () => {
  const Div = styled.div`
    background-color: #ededed;
    color: red;
    ${mediaQuery.tabletport} {
      color: gray;
    }
    ${mediaQuery.tabletland} {
      color: yellow;
    }
    ${mediaQuery.desktop} {
      color: lightgreen;
    }
  `;

  const responsiveCss = css({
    backgroundColor: '#ededed',
    color: 'red',
    [mediaQuery.tabletport]: {
      color: 'gray'
    },
    [mediaQuery.tabletland]: {
      color: 'yellow'
    },
    [mediaQuery.desktop]: {
      color: 'lightgreen'
    }
  });

  return (
    <div>
      <Button
        onClick={(e) => {
          alert('JDS');
        }}
      >
        J-lab DesignSystem
      </Button>
      <h2>Emotion with Response</h2>
      <div css={responsiveCss}>Some Text with css</div>
      <Div>someText with Styled</Div>
    </div>
  );
};

export default index;
