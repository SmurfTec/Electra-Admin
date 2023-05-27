import { useState,useEffect } from "react";
import IMAGES from "../../assets/Images";
import { SVGIcon } from "../SVG";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
export const SideBar = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
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
      url: "/ProductDetail",
      DropDown:true,
      DropValues:["All Products","Product Requests"]
    },
    {
      id: 4,
      name: "Wallet",
      icon: IMAGES.Wallet,
      active: false,
      url: "/Dashboard",
    },
    { id: 5, name: "Listings", icon: IMAGES.Listing, active: false },
    { id: 6, name: "Orders", icon: IMAGES.Order, active: false },
    { id: 7, name: "Verification", icon: IMAGES.Verification, active: false },
    {
      id: 8,
      name: "Roles",
      icon: IMAGES.Roles,
      active: false,
      iconFillColor: "",
    },
    { id: 9, name: "Fee Modifier", icon: IMAGES.FreeModifier, active: false },
    { id: 10, name: "Coupons", icon: IMAGES.Coupons, active: false },
    { id: 11, name: "Categories", icon: IMAGES.Categories, active: false },
    { id: 12, name: "Edit Website", icon: IMAGES.EditWebsite, active: false },
    { id: 13, name: "Help center", icon: IMAGES.HelpCenter, active: false },
    {
      id: 14,
      name: "Settings",
      icon: IMAGES.Settings,
      active: false,
      iconFillColor: "",
    },
  ]);
  const handleItemClick = (itemId: number) => {
    const updatedNavItems = navItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
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
              />
              <p
                className={`${
                  item.active ? "text-[white]" : "text-gray"
                }  font-[600] cursor-pointer`}
              >
                {item.name}
              </p>
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
