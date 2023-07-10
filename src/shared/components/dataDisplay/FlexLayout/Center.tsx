import { css } from '@emotion/react';
import { Flex } from '@jdesignlab/react';
import { SingleNodeLayoutProps } from './type';

export const Center = (props: SingleNodeLayoutProps) => {
  const { children, style } = props;
  return (
    <Flex justify="center" items="center" css={css({ ...style })}>
      <Flex.Item>{children}</Flex.Item>
    </Flex>
  );
};
