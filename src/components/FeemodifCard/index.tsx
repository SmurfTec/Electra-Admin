import IMAGES from '../../assets/Images';
import { SVGIcon } from '../SVG';
export const Feemodifcard = (props: any) => {
  return (
    <div className="h-[93px] w-fit min-w-[160px] bg-[#FCFCFC] border border-custom rounded-[7px] p-3 my-3 ">
      <p className="text-[#A4A4A4] text-[12px]">{props.title}</p>
      <div className="flex justify-between mt-4 items-center">
        <p className="text-[#212121] font-bold">{props.number}</p>
        <SVGIcon
          className="h-[15px] overflow-hidden"
          filled={true}
          fillcolor={'black'}
          src={IMAGES.Editpen}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};
