type ChipSize = 'sm' | 'md' | 'lg';
export const chipStyle = (size: ChipSize, color: string, clickable: boolean) => {
  let chipPadding = '7px 12px 5px';
  let chipHeight = '32px';
  let fontSize = '15px';
  let radius = '6px';

  if (size === 'sm') {
    chipPadding = '5px 10px 3px';
    chipHeight = '26p';
    fontSize = '12px';
    radius = '4px';
  }
  if (size === 'lg') {
    chipPadding = '10px 14px 8px';
    chipHeight = '38px';
    fontSize = '18px';
    radius = '8px';
  }

  return {
    display: 'inline-flex',
    jusityContent: 'center',
    alignItems: 'baseline',
    height: chipHeight,
    padding: chipPadding,
    border: `${color} solid 1px`,
    backgroundColor: `${color}26`,
    borderRadius: radius,
    color,
    fontSize,
    cursor: clickable ? 'hover' : 'default',
    '&:hover': {
      boxShadow: clickable
        ? // eslint-disable-next-line max-len
          'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px'
        : 'none'
    }
  };
};
