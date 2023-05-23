import styled from '@emotion/styled';
import { mq } from '@shared/styles/mixins/responsive';

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
