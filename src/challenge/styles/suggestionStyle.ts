import { mq } from '@shared/styles/mixins/responsive';

export const suggestionAsideStyle = {
  // position: 'sticky',
  // width: '280px',
  minWidth: '300px',
  height: '300px',
  // background: '#fafafa',
  top: '12px',
  flex: ' 0 1 300px',
  // order: '-1',
  flexGrow: 1,
  padding: '8px',
  // borderLeft: 'solid #4695E516 4px',
  // background: '#4695E516',
  [mq.lg]: { flexGrow: 0 },
  [mq.xl]: {}
};

export const suggestionHeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#FFE38B',
  padding: '8px 8px 6px'
};
