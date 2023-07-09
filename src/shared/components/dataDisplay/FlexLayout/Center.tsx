import { Flex } from '@jdesignlab/react';
import { SingleNodeLayoutProps } from './type';

export const Center = (props: SingleNodeLayoutProps) => {
  const { children, css } = props;
  return (
    <Flex justify="center" items="center" css={css}>
      <Flex.Item>{children}</Flex.Item>
    </Flex>
  );
};
