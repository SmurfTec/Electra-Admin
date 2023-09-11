import IMAGES from '../../assets/Images';
export const AdminCards = (props: any) => {
  return (
    <div className="w-[187px] h-[93px] border border-custom rounded-[10px] bg-lightgray">
      <div className="flex justify-between p-2">
        <p className="text-[#A4A4A4] text-[12px]"> {props.accounts}</p>
        <div className="flex ">
          <img className="-mr-2" src={IMAGES.Guy1} />
          <img className="-mr-2" src={IMAGES.Guy2} />
          <img src={IMAGES.Guy3} />
        </div>
      </div>
      <p className="p-2">{props.title}</p>
    </div>
  );
};
