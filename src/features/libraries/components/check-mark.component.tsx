import React from "react";

type CheckMarkComponentProps = {};

export const CheckMarkComponent: React.FC<CheckMarkComponentProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.9216 11.7687L10.75 14.5971L16.4069 8.94022L17.8211 10.3544L11.8107 16.3648C11.2249 16.9506 10.2752 16.9506 9.68937 16.3648L6.50739 13.1829L7.9216 11.7687Z"
        fill="#4CB7A3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.56152C5.92487 1.56152 1 6.48639 1 12.5615C1 18.6367 5.92487 23.5615 12 23.5615C18.0751 23.5615 23 18.6367 23 12.5615C23 6.48639 18.0751 1.56152 12 1.56152ZM3 12.5615C3 7.59096 7.02944 3.56152 12 3.56152C16.9706 3.56152 21 7.59096 21 12.5615C21 17.5321 16.9706 21.5615 12 21.5615C7.02944 21.5615 3 17.5321 3 12.5615Z"
        fill="#4CB7A3"
      />
    </svg>
  );
};
