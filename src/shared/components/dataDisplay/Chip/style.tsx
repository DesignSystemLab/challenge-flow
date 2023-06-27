type ChipSize = 'sm' | 'md' | 'lg';
export const chipStyle = (size: ChipSize, bordered: boolean) => {
  let chipPadding = '7px 12px';
  let chipHeight = '32px';
  if (size === 'sm') {
    chipPadding = '5px 10px';
    chipHeight = '26px';
  }
  if (size === 'lg') {
    chipPadding = '10px 14px ';
    chipHeight = '38px';
  }

  return {
    display: 'inline-flex',
    jusityContent: 'center',
    alignItems: 'center',
    height: chipHeight,
    padding: chipPadding,
    border: bordered ? 'solid #e1e1e1 1px' : 'none',
    borderRadius: size === 'lg' ? '20px' : '16px'
  };
};
