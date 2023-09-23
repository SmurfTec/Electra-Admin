import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components';
import { CustomButton } from '../../../atoms';
import IMAGES from '../../../assets/Images';
import { useGetNoticBanner } from '../../../custom-hooks';
import { hideAllNoticebanner } from '../../../store/Slices/WebsiteSlice';
type Banner = {
  id: number;
  title: string;
  color: string;
  background: string;
  created_on: string;
  updated_on: string;
};

type DataBanner = {
  results?: number;
  banners?: Banner[];
  deleteBanner: Function;
};
export const Noticebanner = () => {
  const navigate = useNavigate();
  let status = false;
  const { data, bannerLoading, deleteBanner }: DataBanner | any =
    useGetNoticBanner();
  useEffect(() => {
    if (!bannerLoading) {
      console.log(data);
    }
  }, []);
  const deleteBannerById = async (id: any) => {
    try {
      const deleted = await deleteBanner(id);
      console.log(deleted);
    } catch (e) {
      console.log(e);
    }
  };
  const hideBanners = async () => {
    try {
      let body = {
        status: status,
      };
      const hide = await hideAllNoticebanner(body);
      console.log(hide);
    } catch (e) {}
  };

  return (
    <div>
      <Header typeSearch={true} placeholder="Search" UserBox={true} />
      <p className="font-bold my-3">Notice Banners</p>
      <div className="flex gap-3">
        <CustomButton
          classes={'!bg-[#3C82D6] !h-[42px] !w-[122px] !rounded-[9px]'}
          txt={'+ Add New'}
          onClick={() => {
            navigate('/Addbanner');
          }}
        />
        <CustomButton
          onClick={() => {
            status = !status;
            hideBanners();
          }}
          classes={
            '!bg-[#EFEFEF] !h-[42px] !w-[162px] !rounded-[9px] !text-[black]'
          }
          txt={'Hide All On Website'}
        />
      </div>
      <div className="mt-2 rounded">
        {!bannerLoading &&
          data.banners.map((item: Banner, index: number) => {
            console.log(item.id);
            return (
              <div
                key={index}
                style={{
                  backgroundColor: item.background,
                }}
                className={`!bg-[${item.background}] my-2 h-[43px] w-[40%] flex items-center justify-between px-3 cursor-pointer`}
              >
                <p
                  style={{
                    color: item.color,
                  }}
                  className={`text-[${item.color}]`}
                >
                  {item.title}
                </p>
                <div className="flex gap-3">
                  <img
                    src={IMAGES.Editwhite}
                    onClick={() => {
                      navigate(`/EditNewBanner/${item.id}`);
                    }}
                  />
                  <img
                    src={IMAGES.Redbin}
                    onClick={() => {
                      deleteBannerById(item.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
