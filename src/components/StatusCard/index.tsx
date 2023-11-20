type Statuscard = {
  title: string;
  number: string;
  img: string;
  onClick?: React.MouseEventHandler;
  isActive?: boolean;
};
export const StatusCard = ({
  title,
  number,
  img,
  onClick,
  isActive = false,
}: Statuscard) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive && 'border-2'
      } bg-lightgray flex justify-between h-[96px] w-[191px] rounded p-5 overflow-hidden`}
    >
      <div className="h-[80px]">
        <p className="text-[13px] font-semibold">{title}</p>
        <p className="text-[28px] font-bold">{number}</p>
      </div>
      <div>
        <img className="h-10" src={img} />
      </div>
    </div>
  );
};
