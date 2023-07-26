import React from "react";

const Card = ({
  outside,
  inside,
  children,
}: {
  outside?: string;
  inside?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={outside ? outside : `w-full max-w-xs`}>
      <div className={ inside ? inside : `bg-white text-black rounded-md pt-4 pb-8 px-4 shadow-lg`}>
        {children}
      </div>
    </div>
  );
};
export default Card;
