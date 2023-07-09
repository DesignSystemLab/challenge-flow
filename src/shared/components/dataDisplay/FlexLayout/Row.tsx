import { Flex } from '@jdesignlab/react';
import { MultipleNodeLayoutProps } from './type';

export const Row = (props: MultipleNodeLayoutProps) => {
  const { children, gap = 0, wrap = false, css } = props;
  return (
    <Flex direction="row" gap={gap} wrap={wrap ? 'wrap' : 'nowrap'} css={css}>
      {children.map((child: React.ReactNode, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <Flex.Item key={`row-${index}`}>{child}</Flex.Item>
      ))}
    </Flex>
  );
};
