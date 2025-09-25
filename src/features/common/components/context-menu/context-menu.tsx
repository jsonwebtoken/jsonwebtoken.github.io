// src/components/ContextMenu.tsx
import React, { FC } from "react";
import "./ContextMenu.scss";
import { BrandMenuItem } from "@/features/localization/models/brand-dictionary.model";

interface ContextMenuProps {
  items: BrandMenuItem[];
  position: { x: number; y: number } | null;
}

const ContextMenu: FC<ContextMenuProps> = ({ items, position }) => {
  if (!position) return null;

  return (
    <ul className="context-menu" style={{ top: position.y, left: position.x }}>
      {items.map((item, index) => {
        if (item.type === "COPY") {
          return (
            <li
              key={index}
              className="context-menu-item"
              // onClick={item.onClick}
            >
              {item.label}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ContextMenu;
