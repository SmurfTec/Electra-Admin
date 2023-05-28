import IMAGES from "../../assets/Images";

export const Productdetailcard = (props: any) => {
  return (
    <div className="border border-custom w-[363px] h-[auto] rounded-xl">
      <div className="flex justify-between mt-2 px-4 items-center">
        <div className="flex gap-3 items-center">
          <p className="font-bold">PS4 Slim Version</p>
          <img src={IMAGES.New} />
        </div>
        <p className="font-light text-[12px] text-[#656565]">20 aug,2022</p>
      </div>
      <div>
        <p className="p-4 font-medium text-[#656565]">
         {props.text}
        </p>
      </div>
      <div className="px-4 mb-3">
        <div className="flex gap-4 ">
          <img src={IMAGES.personicon} />
          <p className="font-bold">Huzayfah Hanif</p>
        </div>
      </div>
    </div>
  );
};
