import React from "react";

export const SystemIconComponent: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4V12C1 13.6569 2.34315 15 4 15H12C13.6569 15 15 13.6569 15 12V4C15 2.34315 13.6569 1 12 1H4C2.34315 1 1 2.34315 1 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <rect
        x="4"
        y="4"
        width="8"
        height="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      ></rect>
      <rect
        x="11.25"
        y="11.25"
        width="1.5"
        height="1.5"
        rx="0.75"
        fill="currentColor"
      ></rect>
      <path
        d="M4 12H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
