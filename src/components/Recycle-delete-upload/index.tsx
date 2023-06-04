import IMAGES from "../../assets/Images";
export const Threebuttons = () => {
  return (
    <div
      className="flex items-center gap-5 justify-center h-[134px] w-[309px] rounded-lg"
      style={{
        background:
          "linear-gradient(180deg, rgba(33, 33, 33, 0.51) 0%, rgba(33, 33, 33, 0.526042) 52.31%, rgba(80, 80, 80, 0.83) 100%)",
      }}
    >
      <button className="bg-[#D9D9D9] h-[69px] rounded ">
        <img src={IMAGES.recycle} className="h-[69px] max-w-[169px] p-5" />
      </button>
      <button className="bg-[#D9D9D9] h-[69px] rounded ">
        <img src={IMAGES.delete} className="h-[69px] max-w-[169px] p-5" />
      </button>
      <button className="bg-[#D9D9D9] h-[69px] rounded ">
        <img src={IMAGES.cam} className="h-[69px] max-w-[169px] p-5" />
      </button>
    </div>
  );
};
