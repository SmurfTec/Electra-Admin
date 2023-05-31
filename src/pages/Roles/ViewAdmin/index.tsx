import React from "react";
import { Header } from "../../../components";
import IMAGES from "../../../assets/Images";
import { SVGIcon } from "../../../components/SVG";
import { CustomMenu } from "../../../atoms/global.style";
import { CustomButton } from "../../../atoms";
export const ViewAdmin = () => {
  const menuLeft: any = React.useRef(null);
  const items = [
    {
      items: [
        {
          label: "Ban User",
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ backgroundColor: "rgba(255, 245, 0, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={"#212121"} src={IMAGES.Ban} /> Ban User
              </div>
            );
          },
        },
        {
          label: "Delete",
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: "rgba(231, 29, 54, 0.05)" }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
        {
          label: "Select",
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: "rgba(46, 102, 194, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={"#212121"} src={IMAGES.Select} /> Select
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
        <div className="border border-[#F7F7F8] h-[480px] w-[400px]">
          <div className="p-1 flex gap-3 border-b border-custom">
            <img className="h-[136px] w-[136px]" src={IMAGES.Laughingadmin} />
            <div className="w-[70%] ">
              <p className="font-bold text-[24px]">John Carter</p>
              <p className="text-[#969696]">annejacob2@ummoh.com</p>
              <div className="mt-8 flex justify-between w-[100%]">
                <div>
                  <p className="text-[#969696]">Assigned On</p>
                  <p>20 Aug, 2022</p>
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
              <p className="ml-2">Sub Admin</p>
            </div>
            <div className="mt-3">
              <p className="text-[#969696] ml-2">Phone</p>
              <p className="ml-2">+53563636366336</p>
            </div>
            <div className="mt-3">
              <p className="text-[#969696] ml-2">Last Active On</p>
              <p className="ml-2">10.00 Pm - Thursday</p>
            </div>
          </div>
          <div className=" flex justify-center">
            <CustomButton
              txt={"Create Admin"}
              classes={" !w-[90%]  !rounded-[6px] !h-[50px] mt-10 "}
            />
          </div>
        </div>
        <div className="border border-[#F7F7F8] h-[480px] w-[400px]">
          <div className="flex gap-3 ml-2 mt-3">
            <img className="p-2"
            src={IMAGES.Loginarrow}/>
            <div>
              <p>
                <b>
                Login</b> to the portal
              </p>
              <p className="text-[#969696] mt-2 text-[11px]">
                Wed - 10.00pm
              </p>
            </div>
          </div>
          <div className="flex gap-3 ml-2 mt-3">
            <img className="p-2"
            src={IMAGES.personicon}/>
            <div>
              <p>
                <b>
                Login</b> to the portal
              </p>
              <p className="text-[#969696] mt-2 text-[11px]">
                Wed - 10.00pm
              </p>
            </div>
          </div> <div className="flex gap-3 ml-2 mt-3">
            <img className="p-2"
            src={IMAGES.Key}/>
            <div>
              <p>
                <b>
                Login</b> to the portal
              </p>
              <p className="text-[#969696] mt-2 text-[11px]">
                Wed - 10.00pm
              </p>
            </div>
          </div> <div className="flex gap-3 ml-2 mt-3">
            <img className="p-2"
            src={IMAGES.deleteproduct}/>
            <div>
              <p>
                <b>
                Login</b> to the portal
              </p>
              <p className="text-[#969696] mt-2 text-[11px]">
                Wed - 10.00pm
              </p>
            </div>
          </div> <div className="flex gap-3 ml-2 mt-3">
            <img className="p-2"
            src={IMAGES.personicon}/>
            <div>
              <p>
                <b>
                Login</b> to the portal
              </p>
              <p className="text-[#969696] mt-2 text-[11px]">
                Wed - 10.00pm
              </p>
            </div>
          </div> <div className="flex gap-3 ml-2 mt-3">
            <img className="p-2"
            src={IMAGES.Logoutarrow}/>
            <div>
              <p>
                <b>
                Login</b> to the portal
              </p>
              <p className="text-[#969696] mt-2 text-[11px]">
                Wed - 10.00pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
