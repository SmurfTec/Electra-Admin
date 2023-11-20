import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import IMAGES from '../../assets/Images';
import {
  ChooseDate,
  ChooseFilter,
  HeaderDropDown,
  HeaderSearch,
} from '../../atoms';
import { BaseURL } from '../../config';
type headerProps = {
  typeSearch?: boolean;
  title?: string;
  semiTitle?: string;
  chooseDate?: boolean;
  chooseFilter?: boolean;
  UserBox?: boolean;
  placeholder?: string;
  titleClass?: string;
  headerClasses?: string;
  dropdown?: boolean;
};

export const Header = (props: headerProps) => {
  const [drop, setDrop] = useState(false);
  const [socket, setsocket] = useState<any>();
  const [notification, setnotification] = useState<any>();
  const [userInfo, setUserInfo] = useState<{
    role: string;
    name: string;
  } | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const refresh = JSON.parse(localStorage.getItem('refresh') as string);

    const socket = io(BaseURL, {
      transports: ['websocket'],
      extraHeaders: {
        authentication: token,
      },
    });
    socket.on('connect', () => {
      const user = JSON.parse(localStorage.getItem('user') as string);

      socket.emit('notifications', {
        userId: user.id,
      });
      socket.on('notifications', (data: any) => {
        setnotification(data);
      });
    });
    setsocket(socket);
    return () => {
      socket.disconnect(); // Clean up the socket connection when component unmounts
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const data: string | null = localStorage.getItem('user');
      if (data) {
        const parsedData = JSON.parse(data);

        setUserInfo({
          name: `${parsedData?.profile?.firstname} ${parsedData?.profile?.lastname}`,
          role: parsedData?.roles?.[0] || '-',
        });
      }
    }
  }, []);

  return (
    <>
      <div
        className={`overflow-hidden h-16 mt-2 mb-2 flex items-center ${
          props.title ? `justify-between` : `justify-end`
        }  px-2 pr-8 ${props.headerClasses} relative`}
      >
        {props.title && (
          <div>
            <p
              className={`text-[23px] font-bold  text-[#212121] ${props.titleClass}`}
            >
              {props.title}
            </p>
            {props.semiTitle && (
              <p className="text-[#A4A4A4]">{props.semiTitle}</p>
            )}
          </div>
        )}
        <div className="flex gap-4 items-center relative">
          {props?.chooseFilter && (
            <div className="flex gap-4">
              <ChooseFilter />
              <div className="border border-[#B4B4B4]"></div>
            </div>
          )}
          <div className="flex gap-4">
            <div className="bg-[black] rounded-[39px] flex  w-9 h-9 justify-center items-center">
              {props.UserBox && (
                <img
                  className="cursor-pointer"
                  src={IMAGES.RectangleBox}
                  onClick={() => setDrop(!drop)}
                />
              )}
            </div>
            <div className="border border-[#B4B4B4]"></div>
          </div>

          <div className="flex gap-2">
            <div>
              <img src={IMAGES.Admin} />
            </div>
            <div>
              <p className="font-bold">{userInfo?.name || '-'}</p>
              <p className="font-light text-[12px]">{userInfo?.role || '-'}</p>
            </div>
          </div>
        </div>
      </div>
      {drop && (
        <HeaderDropDown
          className={
            'absolute h-[340px] w-[401px] right-40 top-19 rounded-lg bg-white'
          }
          notification={notification}
        />
      )}
    </>
  );
};
