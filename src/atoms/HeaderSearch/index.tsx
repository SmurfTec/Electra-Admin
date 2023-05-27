import React from "react";

export const HeaderSearch = (props: any) => {
  return (
    <div className="flex items-center gap-2">
      <i className="pi pi-search   " style={{ color: "#656565" }}></i>
      <input
        className="border-none
        focus:outline-none
        "
        placeholder={props.placeholder}
      />
    </div>
  );
};
