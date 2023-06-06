export const HeaderSearch = (props: any) => {
  return (
    <div className="flex items-center w-[50%] gap-2">
      <i className="pi pi-search   " style={{ color: "#656565" }}></i>
      <input
        className="border-none
        focus:outline-none
        w-[50%]
        "
        placeholder={props.placeholder}
      />
    </div>
  );
};
