import { Flex } from '@jdesignlab/react';
import { MultipleNodeLayoutProps } from './type';

export const Column = (props: MultipleNodeLayoutProps) => {
  const { children, gap = 0, wrap = false, css } = props;
  return (
    <Flex direction="column" gap={gap} wrap={wrap ? 'wrap' : 'nowrap'} css={css}>
      {children.map((child: React.ReactNode, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <Flex.Item key={`column-${index}`}>{child}</Flex.Item>
      ))}
    </Flex>
  );
};
