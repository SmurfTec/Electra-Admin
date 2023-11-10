import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomButton } from '../../../atoms';
import { Header } from '../../../components';
import { useGetWebsite } from '../../../custom-hooks/WebsiteHook';

export const Editwebsite = () => {
  const navigate = useNavigate();
  const [web, setweb] = useState<any>([]);

  const { getWebsitedata, loading } = useGetWebsite(web);
  useEffect(() => {
    setweb(getWebsitedata);
  }, [loading]);
  return (
    <div>
      <Header typeSearch={true} placeholder="Search Page" UserBox={true} />
      <div>
        <p className="font-bold text-[19px]">Pages</p>
        <div className="flex p-2 flex-wrap mt-3 gap-6">
          {!loading ? (
            <>
              {web?.websites &&
                web?.websites?.map((item: any, index: any) => {
                  return (
                    <CustomButton
                      key={index}
                      onClick={() => {
                        navigate(`/Webandbanner/${item.id}`);
                      }}
                      txt={item.name}
                      classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
                      editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
                    />
                  );
                })}
              <CustomButton
                onClick={() => {
                  navigate(`/NoticeBanner`);
                }}
                txt={'Notice banner'}
                classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
                editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
              />
            </>
          ) : (
            <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
              <ProgressSpinner style={{ overflow: 'hidden' }} />
            </div>
          )}{' '}
        </div>
      </div>
    </div>
  );
};
