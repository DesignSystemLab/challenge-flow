import { useEffect } from 'react';
import { chipStyle } from './style';

type ChipSize = 'sm' | 'md' | 'lg';

interface ChipProps {
  children?: React.ReactNode;
  size?: ChipSize;
  color?: string;
  bordered?: boolean;
  as?: React.ElementType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Chip = (props: ChipProps) => {
  const { children, size = 'md', color = '#fafafa', bordered = false, as, onClick = () => {}, ...rest } = props;
  const Component = as ?? 'div';
  useEffect(() => {}, []);
  return (
    <Component onClick={onClick} css={{ ...chipStyle(size, bordered), background: color }} {...rest}>
      {children}
    </Component>
  );
};
