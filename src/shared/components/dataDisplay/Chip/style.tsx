type ChipSize = 'sm' | 'md' | 'lg';
export const chipStyle = (size: ChipSize, color: string) => {
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
    fontSize
  };
};
