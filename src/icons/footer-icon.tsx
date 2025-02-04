import React from "react";

const SvgIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        d="M5.83329 1.66663V18.3333M14.1666 1.66663V18.3333M1.66663 9.99996H18.3333M1.66663 5.83329H5.83329M1.66663 14.1666H5.83329M14.1666 14.1666H18.3333M14.1666 5.83329H18.3333M3.48329 1.66663H16.5166C17.5199 1.66663 18.3333 2.47998 18.3333 3.48329V16.5166C18.3333 17.5199 17.5199 18.3333 16.5166 18.3333H3.48329C2.47998 18.3333 1.66663 17.5199 1.66663 16.5166V3.48329C1.66663 2.47998 2.47998 1.66663 3.48329 1.66663Z"
        stroke="#4338CA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

SvgIcon.displayName = "SvgIcon";

export default SvgIcon;
