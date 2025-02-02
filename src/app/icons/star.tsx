import * as React from "react";

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <g id="star">
      <path
        id="Vector"
        fill="#FDE047"
        stroke="#FDE047"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14 2.333 3.605 7.304 8.061 1.178-5.833 5.682 1.377 8.026L14 20.732l-7.21 3.791 1.376-8.026-5.833-5.682 8.062-1.178z"
      />
    </g>
  </svg>
);

export default StarIcon;

