type Statuscard = {
  title: string;
  number: string;
  img: string;
  onClick?: React.MouseEventHandler;
};
export const StatusCard = (props: Statuscard) => {
  return (
    <div
      onClick={props.onClick}
      className="bg-lightgray flex justify-between h-[96px]
    w-[191px] rounded p-5   overflow-hidden
    "
    >
      <div className="h-[80px]">
        <p className="text-[13px] font-semibold">{props.title}</p>
        <p className="text-[28px] font-bold">{props.number}</p>
      </div>
      <div>
        <img className="h-10" src={props.img} />
      </div>
    </div>
  );
};
