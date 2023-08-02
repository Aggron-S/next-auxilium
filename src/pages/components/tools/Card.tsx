import React from "react";
import { useStateService } from "@/shared/StateService";

const Card = ({
  outside,
  inside,
  children,
}: {
  outside?: string;
  inside?: string;
  children: React.ReactNode;
}) => {
  const { state } = useStateService();

  return (
    <div className={outside ? outside : `w-full max-w-xs`}>
      <div className={ inside ? inside : `${state.card_color, state.text_color} rounded-md pt-4 pb-8 px-4 shadow-lg`}>
        {children}
      </div>
    </div>
  );
};
export default Card;
