import React, { useEffect } from "react";

export const FetchButton = (props: any) => {
  const [isChecked, setIsChecked] = React.useState(false);
  useEffect(() => {
    if (props.manual === props.value) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [props.manual]);
  const handleCheckboxChange = () => {
    if (props.manual !== props.value) {
      props.setManual(props.value);
      setIsChecked(!isChecked);
    } else {
      props.setManual(props.value);
    }
  };

  return (
    <div>
      <button
        style={{ borderSpacing: "9rem", borderWidth: "2px" }}
        className={`border-dashed rounded border-2 p-5 w-[225px] bg-lightgray ${
          isChecked ? "border-blue-500" : "border-[#EFEFEF]"
        } p-2`}
      >
        <input
          type="radio"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2 rounded-[10px] "
        />
        {props.txt}
      </button>
    </div>
  );
};
