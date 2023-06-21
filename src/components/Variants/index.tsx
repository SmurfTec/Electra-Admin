import React from "react";
import { CustomButton } from "../../atoms";

export const Variants = (props: any) => {
    return (
    <div className="flex gap-3">
      {props.data.map((item:any, index:number) => {
        return <CustomButton
        onClick={props.handleFunction}
        
        key={index} txt={item.txt} classes={item.classes} />;
      })}
    </div>
  );
};
