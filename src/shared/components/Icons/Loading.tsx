export const Loading = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: 'auto',
      backgroundColor: 'transparent',
      display: 'block',
      shapeRendering: 'auto'
    }}
    width="24px"
    height="24px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g>
      <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#dfe4ea" strokeWidth="12" />
      <path d="M49 3L49 27L61 15L49 3" fill="#dfe4ea" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </g>
  </svg>
);
