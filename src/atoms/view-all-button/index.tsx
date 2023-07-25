import IMAGES from "../../assets/Images";
import { useNavigate } from "react-router-dom";
export const ViewAll = (props: any) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(props?.route);
      }}
      className="flex gap-2 cursor-pointer"
    >
      {" "}
      <p className="font-bold text-[16px]">View All</p>
      <img src={IMAGES.ViewArrow} />
    </div>
  );
};
