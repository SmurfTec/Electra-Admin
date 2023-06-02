import { useState,useEffect } from "react";
import IMAGES from "../../assets/Images";
import { SVGIcon } from "../SVG";
import { Link, useNavigate } from "react-router-dom";
import { PanelMenu } from 'primereact/panelmenu';
export const SideBar = () => {
 
  const navigate=useNavigate()
  const [navItems, setNavItems] = useState([
    {
      id: 1,
      name: "Dashboard",
      icon: IMAGES.Barchart,
      active: true,
      number: 25,
      url: "/Dashboard",
    },
    {
      id: 2,
      name: "Users",
      icon: IMAGES.User,
      active: false,
      number: 25,
      url: "/Users",
    },
    {
      id: 3,
      name: "Products",
      icon: IMAGES.Product,
      active: false,
      iconFillColor: "",
      url: "/Products",
    
      DropDown:true,
      DropValues:["All Products","Product Requests"]
    },
    {
      id: 4,
      name: "Wallet",
      icon: IMAGES.Wallet,
      active: false,
      url: "/Wallet",
    },
    { id: 5, name: "Listings", icon: IMAGES.Listing, active: false ,url:"/Listings"},
    { id: 6, name: "Orders", icon: IMAGES.Order, active: false },
    { id: 7, name: "Verification",url:'/Verification' ,icon: IMAGES.Verification, active: false },
    {
      id: 8,
      name: "Roles",
      icon: IMAGES.Roles,
      active: false,
      iconFillColor: "",
      url: "/Roles",
    },
    { id: 9, name: "Fee Modifier", icon: IMAGES.FreeModifier, active: false },
    { id: 10, name: "Coupons",url:'/Coupon' ,icon: IMAGES.Coupons, active: false },
    { id: 11, name: "Categories",url:'/Category' , icon: IMAGES.Categories, active: false },
    { id: 12, name: "Edit Website", icon: IMAGES.EditWebsite, active: false },
    { id: 13, name: "Help center",url:'/HelpCenter', icon: IMAGES.HelpCenter, active: false },
    {    
      id: 14,
      name: "Settings",
      icon: IMAGES.Settings,
      active: false,
      iconFillColor: "", 
      strokeColor:"",
      url:"/Settings",   
      
    },
  ]);
  const handleItemClick = (itemId: number) => {
    const updatedNavItems = navItems.map((item) => {
      if (item.id === itemId) {  
        if(item.name=="Settings"){
          return { ...item, active: true,iconFillColor:'transparent' };  //icon:IMAGES.SettingActive,
        }else{
          return { ...item, active: true };
        }
        
      } else {
        if(item.name=="Settings"){
          return { ...item, active: false,iconFillColor:'' };
        }else{
          return { ...item, active: false };
        }
        
      }
    });
    setNavItems(updatedNavItems);
  };

  return (

    <>
    <div className="w-[17rem] h-[1024px] bg-[#FCFCFC]">
    <img
      className="ml-[39px] mt-[17px] w-[75px] h-[33px] mb-[45px]"
      src={IMAGES.Logo}
      alt="Logo"
    />
    <div className="flex flex-col gap-3">
      <div className="w-[11.75rem] h-[35px] flex items-center justify-between ml-[22px] rounded-[8px] pl-[17px] pr-[19px]">
        <p className="text-gray font-[600]">ADMIN</p>
      </div>
      {navItems.map((item: any) => (
        <Link key={item.id} to={item.url}>
          <div
            key={item.id}
            className={`w-[11.75rem] h-[35px] flex items-center justify-between ml-[22px] rounded-[8px] pl-[17px] pr-[19px] ${
              item.active ? "bg-[#212121]" : ""
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className="flex items-center  justify-between  w-full">
            <div className="flex items-center gap-3">
            <SVGIcon
                src={item.icon}
                filled={item.active}
                fillcolor={item?.iconFillColor}
                strokeColor={item?.strokeColor}
              />
              <p
                className={`${
                  item.active ? "text-[white]" : "text-gray"
                }  font-[600] cursor-pointer`}
              >
                {item.name}
              </p>
              {item.DropDown && 
              <SVGIcon
              src={IMAGES.MenuDropdown}
              filled={item.active}
              fillcolor={item?.iconFillColor}
            />
              }
            </div>

              {item.number && (
                <div
                  className={`w-[22px] flex justify-center items-center text-[13px] h-[22px] rounded-[6px] ${
                    item.active
                      ? "bg-[white] text-[#3C82D6]"
                      : "bg-[#3C82D6] text-[white]"
                  }`}
                >
                  {item.number}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
    </>
   
  );
};
