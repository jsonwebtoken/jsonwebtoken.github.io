import React from "react";

type CheckMarkComponentProps = {};

export const XMarkComponent: React.FC<CheckMarkComponentProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 11.1473L15.5355 7.61176L16.9497 9.02597L13.4142 12.5615L16.9497 16.097L15.5355 17.5113L12 13.9757L8.46444 17.5113L7.05023 16.097L10.5857 12.5615L7.0502 9.02598L8.46442 7.61176L12 11.1473Z"
        fill="#E27133"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12.5615C1 6.48639 5.92487 1.56152 12 1.56152C18.0751 1.56152 23 6.48639 23 12.5615C23 18.6367 18.0751 23.5615 12 23.5615C5.92487 23.5615 1 18.6367 1 12.5615ZM12 3.56152C7.02944 3.56152 3 7.59096 3 12.5615C3 17.5321 7.02944 21.5615 12 21.5615C16.9706 21.5615 21 17.5321 21 12.5615C21 7.59096 16.9706 3.56152 12 3.56152Z"
        fill="#E27133"
      />
    </svg>
  );
};
