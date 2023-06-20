import { Text } from '@jdesignlab/react';
import { titleWrapper } from '../../styles/sharedStyle';

interface Props {
  title: string;
}

export const SidebarHeader = (props: Props) => {
  const { title } = props;
  return (
    <div css={titleWrapper}>
      <Text variant="heading" color="shades-white">
        {title}
      </Text>
    </div>
  );
};
