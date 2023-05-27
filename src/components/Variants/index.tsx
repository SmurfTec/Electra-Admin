import React from "react";
import { CustomButton } from "../../atoms";

export const Variants = (props: any) => {
  return (
    <div className="flex gap-3">
      {props.data.map((item, index) => {
        return <CustomButton key={index} txt={item.txt} classes={item.classes} />;
      })}
    </div>
  );
};
