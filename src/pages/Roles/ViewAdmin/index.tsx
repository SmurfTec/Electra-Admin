import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomButton } from '../../../atoms';
import { CustomMenu } from '../../../atoms/global.style';
import { Header } from '../../../components';
import { SVGIcon } from '../../../components/SVG';
import { BaseURL } from '../../../config';
import { useGetUserById } from '../../../custom-hooks/RolesHooks';
type UserProfile = {
  id: number;
  firstname: string;
  lastname: string;
  coins: number;
  mobile_no: string;
  image_url: string;
};

type UserActivity = {
  message: string;
  type: string;
  created_on: string;
  image: string;
};

type User = {
  id: string;
  email: string;
  password: string;
  is_active: boolean;
  profile: UserProfile;
  has_logged_in: boolean;
  created_by: null | string;
  created_at: string;
  updated_by: null | string;
  updated_at: string;
  is_banned: boolean;
  code_2fa: null | string;
  last_login: string;
  hach_refresh_token: string;
  role: string;
  assigned_on: string;
  user_activities: UserActivity[];
};
type DATA = {
  user?: User;
  userLoading: boolean;
};
export const ViewAdmin = () => {
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split('/').pop();
  const { user, userLoading } = useGetUserById(id) as DATA;
  const [view, setView] = useState(false);

  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const items = [
    {
      items: [
        {
          label: 'Ban User',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Ban} /> Ban User
              </div>
            );
          },
        },
        {
          label: 'Delete',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(231, 29, 54, 0.05)' }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
        {
          label: 'Select',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(46, 102, 194, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Select} /> Select
              </div>
            );
          },
        },
      ],
    },
  ];
  return (
    <div>
      <Header
        placeholder="Search admin activities"
        UserBox={true}
        typeSearch={true}
        chooseDate={true}
      />
      <div className="flex gap-7">
        <div className="border border-[#F7F7F8] h-[450px] w-[400px]">
          <div className="p-1 flex gap-3 border-b border-custom">
            <img className="h-[136px] w-[136px]" src={IMAGES.Laughingadmin} />
            <div className="w-[70%] ">
              <p className="font-bold text-[24px]">
                {user?.profile?.firstname} {user?.profile.lastname}
              </p>
              <p className="text-[#969696]">{user?.email}</p>
              <div className="mt-8 flex justify-between w-[100%]">
                <div>
                  <p className="text-[#969696]">Assigned On</p>
                  <p>{moment(user?.assigned_on).format('DD MMM, YYYY')}</p>
                </div>
                <div
                  className={`text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
                >
                  <SVGIcon
                    onClick={(event: any) => {
                      event.preventDefault();
                      menuLeft.current.toggle(event);
                    }}
                    src={IMAGES.Dots}
                  />

                  <CustomMenu
                    model={items}
                    popup
                    ref={menuLeft}
                    id="popup_menu_left"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-[#969696] ml-2">Role</p>
              <p className="ml-2">{user?.role}</p>
            </div>
            <div className="mt-3">
              <p className="text-[#969696] ml-2">Phone</p>
              <p className="ml-2">{user?.profile.mobile_no}</p>
            </div>
            <div className="mt-3">
              <p className="text-[#969696] ml-2">Last Active On</p>
              <p className="ml-2">
                {moment(user?.last_login).format('hh:mm A - dddd')}
              </p>
            </div>
          </div>
          <div className=" flex justify-center">
            <CustomButton
              onClick={() => {
                navigate('/Searchrole');
              }}
              txt={'Create Admin'}
              classes={' !w-[90%]  !rounded-[6px] !h-[50px] mt-10 '}
            />
          </div>
        </div>
        <div className="border border-[#F7F7F8] h-[454px] w-[400px]">
          {view
            ? user?.user_activities?.map((item: UserActivity, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-3 ml-2 mt-3 pb-2 border-b border-[#FAFAFA]"
                  >
                    <img
                      className="p-2"
                      src={
                        item.image ? BaseURL + item.image : IMAGES.Loginarrow
                      }
                    />
                    <div>
                      <p>{item.message}</p>
                      <p className="text-[#969696] mt-2 text-[11px]">
                        {moment(item.created_on).format('hh:mm A - dddd')}
                      </p>
                    </div>
                  </div>
                );
              })
            : user?.user_activities
                ?.slice(0, 6)
                .map((item: UserActivity, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-3 ml-2 mt-3 pb-2 border-b border-[#FAFAFA]"
                    >
                      <img
                        className="p-2"
                        src={
                          item.image ? BaseURL + item.image : IMAGES.Loginarrow
                        }
                      />
                      <div>
                        <p>{item.message}</p>
                        <p className="text-[#969696] mt-2 text-[11px]">
                          {moment(item.created_on).format('hh:mm A - dddd')}
                        </p>
                      </div>
                    </div>
                  );
                })}

          {view ? (
            <div
              onClick={() => {
                setView(!view);
              }}
              className="flex justify-center items-center cursor-pointer"
            >
              <p className="text-center items-center p-1">View less</p>
            </div>
          ) : (
            <div
              onClick={() => {
                setView(!view);
              }}
              className="flex justify-center items-center cursor-pointer"
            >
              <p className="text-center items-center p-1">View More</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
