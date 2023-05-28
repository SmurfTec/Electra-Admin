import React from "react";

export const FetchButton = (props:any) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <div>
      <button
      style={{borderSpacing:'9rem',borderWidth:"2px"}}
        className={`border-dotted rounded border-2 p-5 w-[225px] bg-lightgray ${
          isChecked ? "border-blue-500" : "border-[#EFEFEF]"
        } p-2`}
      >
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2 rounded-[10px] "
        />
        {props.txt}
      </button>
    </div>
  );
};
