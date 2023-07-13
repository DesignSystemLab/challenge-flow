export const COLOR_SCALE = [
  '#9BCAFA',
  '#FFF3CF',
  '#ef9a9a',
  '#f48fb1',
  '#ce93d8',
  '#b39ddb',
  '#9fa8da',
  '#90caf9',
  '#81d4fa',
  '#80deea',
  '#80cbc4',
  '#58B19F',
  '#a5d6a7',
  '#ffe082',
  '#bcaaa4',
  '#b0bec5'
];
const legendFontColor = '#333333';
const grey = '#969696';

// Typography
const letterSpacing = 'normal';
const fontSize = 16;

// Layout
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: COLOR_SCALE
};

// Labels
const baseLabelStyles = {
  fontSize,
  letterSpacing,
  padding: 10,
  fill: legendFontColor,
  stroke: 'transparent'
};

const centeredLabelStyles = { textAnchor: 'middle', ...baseLabelStyles };

// Strokes
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

// Put it all together...
const theme = {
  area: {
    style: {
      data: {
        fill: legendFontColor
      },
      labels: baseLabelStyles
    },
    ...baseProps
  },
  axis: {
    style: {
      axis: {
        fill: 'transparent',
        stroke: legendFontColor,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: { ...centeredLabelStyles, padding: 25 },
      grid: {
        fill: 'none',
        stroke: 'none',
        pointerEvents: 'painted'
      },
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent'
      },
      tickLabels: baseLabelStyles
    },
    ...baseProps
  },
  bar: {
    style: {
      data: {
        fill: legendFontColor,
        padding: 8,
        strokeWidth: 0
      },
      labels: baseLabelStyles
    },
    ...baseProps
  },
  boxplot: {
    style: {
      max: { padding: 8, stroke: legendFontColor, strokeWidth: 1 },
      maxLabels: { ...baseLabelStyles, padding: 3 },
      median: { padding: 8, stroke: legendFontColor, strokeWidth: 1 },
      medianLabels: { ...baseLabelStyles, padding: 3 },
      min: { padding: 8, stroke: legendFontColor, strokeWidth: 1 },
      minLabels: { ...baseLabelStyles, padding: 3 },
      q1: { padding: 8, fill: grey },
      q1Labels: { ...baseLabelStyles, padding: 3 },
      q3: { padding: 8, fill: grey },
      q3Labels: { ...baseLabelStyles, padding: 3 }
    },
    boxWidth: 20,
    ...baseProps
  },
  candlestick: {
    style: {
      data: {
        stroke: legendFontColor,
        strokeWidth: 1
      },
      labels: { ...baseLabelStyles, padding: 5 }
    },
    candleColors: {
      positive: '#ffffff',
      negative: legendFontColor
    },
    ...baseProps
  },
  chart: baseProps,
  errorbar: {
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        stroke: legendFontColor,
        strokeWidth: 2
      },
      labels: baseLabelStyles
    },
    ...baseProps
  },
  group: {
    ...baseProps
  },
  histogram: {
    style: {
      data: {
        fill: grey,
        stroke: legendFontColor,
        strokeWidth: 2
      },
      labels: baseLabelStyles
    },
    ...baseProps
  },
  legend: {
    colorScale: COLOR_SCALE,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle'
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 }
    }
  },
  line: {
    style: {
      data: {
        fill: 'transparent',
        stroke: legendFontColor,
        strokeWidth: 2
      },
      labels: baseLabelStyles
    },
    ...baseProps
  },
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: 'transparent',
        strokeWidth: 1
      },
      labels: { ...baseLabelStyles, padding: 20 }
    },
    colorScale: COLOR_SCALE,
    width: 400,
    height: 400,
    padding: 50
  },
  scatter: {
    style: {
      data: {
        fill: legendFontColor,
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: baseLabelStyles
    },
    ...baseProps
  },
  stack: {
    ...baseProps
  },
  tooltip: {
    style: { ...baseLabelStyles, padding: 0, pointerEvents: 'none' },
    flyoutStyle: {
      stroke: legendFontColor,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none'
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: {
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: { ...baseLabelStyles, padding: 5, pointerEvents: 'none' },
      flyout: {
        stroke: legendFontColor,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none'
      }
    },
    ...baseProps
  }
};
export default theme;
