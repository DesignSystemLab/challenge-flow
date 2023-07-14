import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Flex = styled.div`
  color: lightgreen;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
  ${mq.md} {
    color: gray;
  }
  ${mq.lg} {
    color: yellow;
  }
  ${mq.xl} {
  }
`;

export const Image = styled.div`
  width: 128px;
  height: 128px;
  background-color: #ededed;
  border: 1px solid #ffffff;
  border-radius: 50%;
`;

export const profileWrapperStyle = css({
  position: 'absolute',
  width: '480px',
  top: '50%',
  left: '50%',
  transform: 'translate3d(-50%, -50%, 0)'
});

export const profileStyle = css({
  listStyle: 'none',
  '&  dt': {
    marginTop: '8px'
  },
  '&  dd': {
    margin: 0
  }
});
