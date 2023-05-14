import React from 'react';
import { Button, ThemeProvider } from '@jdesignlab/react';
import styled from '@emotion/styled';
import { Post } from '@post/components/Post';

const index = () => {
  return (
    <div>
      <Button
        onClick={(e) => {
          alert('JDS');
        }}
      >
        J-lab DesignSystem
      </Button>
    </div>
  );
};

export default index;
