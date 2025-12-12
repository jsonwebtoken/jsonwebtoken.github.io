import React, { useEffect } from "react";

export const useCloseElement = (
  refs: React.RefObject<any>[],
  handleClose: () => void,
) => {
  useEffect(() => {
    if (!refs) {
      return;
    }

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const hit =
        refs.filter((ref) => ref.current && ref.current.contains(event.target))
          .length > 0;

      if (!hit) {
        event.stopPropagation();
        handleClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      refs.forEach((ref) => {
        if (ref.current) {
          switch (event.key) {
            case "Escape":
              handleClose();
              break;
            default:
              return;
          }
          event.preventDefault();
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handleClose]);
};
