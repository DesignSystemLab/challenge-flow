import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const StyledWrap = styled.div`
  background-color: hotpink;
  div {
    font-size: 24px;
  }
`;
const index = () => {
  return (
    <StyledWrap>
      <h2 css={{ color: 'red' }}>sad</h2>
    </StyledWrap>
  );
};

export default index;
