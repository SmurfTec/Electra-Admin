import IMAGES from '../../assets/Images';
type PropTypes = {
  listing: {
    listingStats: number;
    percentStats: number;
  };
  Products: {
    prodStats: number;
    percentStats: number;
  };
  percentStats: number;
};
export const StaticCard = (props: PropTypes) => {
  console.log('props.Products.percentStats', props.Products.percentStats);
  return (
    <div className="bg-[#FCFCFC] h-[182px] w-auto  rounded px-2 ">
      <h1 className="font-bold mt-3 ml-3 text-[20px]">Last Month Statistic</h1>
      <div className="flex flex-wrap gap-8 mt-3 ">
        <div className="  h-[100px] overflow-hidden ">
          <div className="flex gap-2 justify-around">
            <img className=" self-start mt-1 h-4" src={IMAGES.bluehamburger} />
            <div>
              <p className="font-semibold">Total Listings</p>
              <p className="text-[28px] font-bold">
                {props.listing.listingStats}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-1">
            <img
              src={
                props.listing.percentStats <= 0
                  ? IMAGES.downarrow
                  : IMAGES.uparrow
              }
            />
            <p
              className={`text-[12px] text-[${
                props.listing.percentStats <= 0 ? '#FF0000' : '#3C82D6'
              }]`}
            >
              {props.listing.percentStats} % more then previous month
            </p>
          </div>
        </div>
        <div className="h-[100px] overflow-hidden ">
          <div className="flex gap-2 justify-around">
            <img className="self-start mt-0 h-7" src={IMAGES.bluebox} />
            <div>
              <p className="font-semibold">Products Sold</p>
              <p className="text-[28px] font-bold">
                {props.Products.prodStats}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-1">
            <img
              src={
                props.Products.percentStats <= 0
                  ? IMAGES.downarrow
                  : IMAGES.uparrow
              }
            />
            <p
              className={`text-[12px] text-[${
                props.Products.percentStats <= 0 ? '#FF0000' : '#3C82D6'
              }]`}
            >
              {props.Products.percentStats} % more then previous month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
