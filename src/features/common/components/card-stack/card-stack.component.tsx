import React from "react";
import styles from "./card-stack.module.scss";
import { clsx } from "clsx";
import { MonoFont } from "@/libs/theme/fonts";
import {
  CardComponent,
  CardComponentProps,
} from "@/features/common/components/card/card.component";

type CardStackComponentProps = {
  cards: CardComponentProps[];
};

export const CardStackComponent: React.FC<CardStackComponentProps> = ({
  cards,
}) => {
  return (
    <div className={clsx(MonoFont.className, styles.cardStack)}>
      {cards.map((card) => (
        <CardComponent key={card.title} {...card} />
      ))}
    </div>
  );
};
