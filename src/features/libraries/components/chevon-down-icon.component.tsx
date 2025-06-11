import React from "react";

type CheckMarkComponentProps = {};

export const ChevronDownIconComponent: React.FC<
  CheckMarkComponentProps
> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7997 12.9393L16.2694 7.46967L17.3301 8.53033L11.3301 14.5303C11.0372 14.8232 10.5623 14.8232 10.2694 14.5303L4.26942 8.53033L5.33008 7.46967L10.7997 12.9393Z"
        fill="#191919"
      />
    </svg>
  );
};
