import IMAGES from "../../../assets/Images";
import { Header, Webcarousel, Threebuttons } from "../../../components";
import { CustomButton } from "../../../atoms";
import { useNavigate } from "react-router-dom";
export const Webandbanner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header
        typeSearch={true}
        placeholder="Search on home page"
        UserBox={true}
      />
      <div className="mb-2">
        <p className="font-bold text-[19px]">Home Page</p>
        <div className="w-full mt-3 ">
          <Webcarousel />
          <p className="text-[#A4A4A4] flex gap-2 items-center">
            <div className="bg-[#A4A4A4] flex justify-center items-center text-[white] text-center h-[15px] w-[15px] overflow-hidden rounded-full">
              i
            </div>
            Image ratio must be 16:9
          </p>
        </div>
        <button
          className="bg-lightgray w-[6rem]
          mt-4
        text-black font-bold
        rounded-lg  h-[3rem] overflow-hidden"
        >
          Section 1
        </button>
        <div className="border w-[15%] p-[14px] rounded-lg  my-3 text-[16px] font-bold">
          Top trending items
        </div>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-[25px] font-bold">Recommended For You</p>
          <div className="bg-[#3C82D6] overflow-hidden p-2 h-[35px] w-[35px]  flex justify-center rounded-full items-center">
            <img src={IMAGES.Editpen} />
          </div>
        </div>
        <button
          className="bg-lightgray w-[6rem]
          mt-10
        text-black font-bold
        rounded-lg  h-[3rem] overflow-hidden"
        >
          Section 2
        </button>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-[25px] font-bold">Most Popular</p>
          <div className="bg-[#3C82D6] overflow-hidden p-2 h-[35px] w-[35px]  flex justify-center rounded-full items-center">
            <img src={IMAGES.Editpen} />
          </div>
        </div>
        <div className="flex gap-9 justify-around mt-10 ">
          <div
            className=" bg-cover bg-center w-[50%] h-[550px] rounded-[10px] relative"
            style={{
              backgroundImage: `url(${IMAGES.Ultrablackiphone})`,
            }}
          >
            <div className=" absolute top-[40%] left-[30%]">
              <Threebuttons />
            </div>
          </div>
          <div
            className=" bg-cover bg-center w-[50%] h-[550px] rounded-[10px] relative"
            style={{
              backgroundImage: `url(${IMAGES.Ultrablackiphone2})`,
            }}
          >
            <div className=" absolute top-[40%] left-[30%]">
              <Threebuttons />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          <CustomButton
            txt={"Cancel"}
            classes={
              "!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[10px]"
            }
          />
          <CustomButton
            onClick={() => {
              navigate("/Noticebanner");
            }}
            txt={"Update"}
            classes={" !w-[179px] !rounded-[10px] !h-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};
