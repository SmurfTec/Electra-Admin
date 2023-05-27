import IMAGES from "../../assets/Images";
import { HeaderSearch, ChooseDate } from "../../atoms";
type headerProps={
  typeSearch?:boolean
  title?:string
  chooseDate?:boolean
}
export const Header = (props: headerProps) => {
  return (
    <>
      <div className="h-12 mt-2 mb-2 flex items-center justify-between px-2 ">
        {props.typeSearch && <HeaderSearch placeholder="Type here to search" />}
        {props.title&& <p className="text-[23px] font-bold  text-[#212121]">
          {props.title}
          </p>}
        <div className="flex gap-4 items-center ">
        {props.chooseDate &&  <div className="flex gap-4">
            <ChooseDate />
            <div className="border border-[#B4B4B4]"></div>
          </div>}
          <div className="flex gap-4">
            <div className="bg-[black] rounded-[39px] flex items-center w-9 h-9 justify-center">
              <i className="pi pi-comment" style={{ color: "white" }}></i>
            </div>
            <div className="border border-[#B4B4B4]"></div>
          </div>

          <div className="flex gap-2">
            <div>
              <img src={IMAGES.Admin} />
            </div>
            <div>
              <p className="font-bold">Huzayfah Hanif</p>
              <p className="font-light text-[12px]">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
