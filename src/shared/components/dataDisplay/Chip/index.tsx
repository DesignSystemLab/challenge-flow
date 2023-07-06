import { useEffect } from 'react';
import { chipStyle } from './style';

type ChipSize = 'sm' | 'md' | 'lg';

interface ChipProps {
  children?: React.ReactNode;
  size?: ChipSize;
  color?: string;
  as?: React.ElementType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Chip = (props: ChipProps) => {
  const { children, size = 'md', color = '#808080', as, onClick = () => {}, ...rest } = props;
  const Component = as ?? 'div';
  useEffect(() => {}, []);
  return (
    <Component onClick={onClick} css={{ ...chipStyle(size, color) }} {...rest}>
      {children}
    </Component>
  );
};
