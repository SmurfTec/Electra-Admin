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
      open:false,
      DropDown:true,
      subItems:[
        {
          id:31,
          name:"All Products",
          active: true,
          url: "/Products",
        },
        {
          id:32,
          name:"Product Request",
          active: false,
          url: "/Productrequest",
        }
      ],
   
    },
    {
      id: 4,
      name: "Wallet",
      icon: IMAGES.Wallet,
      active: false,
      url: "/Wallet",
    },
    { id: 5, name: "Listings", icon: IMAGES.Listing, active: false ,url:"/Listings"},
    { id: 6, name: "Orders", icon: IMAGES.Order, active: false,url:"/Orders" },
    { id: 7, name: "Verification",url:'/Verification' ,icon: IMAGES.Verification, active: false },
    {
      id: 8,
      name: "Roles",
      icon: IMAGES.Roles,
      active: false,
      iconFillColor: "",
      url: "/Roles",
    },
    { id: 9, name: "Fee Modifier", icon: IMAGES.FreeModifier, active: false ,url:"/Feemodifier"},
    { id: 10, name: "Coupons",url:'/Coupon' ,icon: IMAGES.Coupons, active: false },
    { id: 11, name: "Categories",url:'/Category' , icon: IMAGES.Categories, active: false },
    { id: 12, name: "Edit Website", icon: IMAGES.EditWebsite, active: false ,url:"/Editwebsite"},
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
    const updatedNavItems:any = navItems.map((item:any) => {
      if (item.id === itemId) {  
        if(item.name=="Settings"){
          return { ...item, active: true,iconFillColor:'transparent' };  //icon:IMAGES.SettingActive,
        }
        else{
          if(item.open !==null || item.open !==undefined){
            return { ...item, active: true,open:!item.open,
             
            };
          }else{
            if(item.name!=="Products"){
              return { ...item, active: true,open:false};
            }

            return { ...item, active: true};
          }
          
        }
        
      } else {
        if(item.name=="Settings"){
          return { ...item, active: false,iconFillColor:'' };
        } else {
         
          return { ...item, active: false };
        }
        
      }
    });
    setNavItems(updatedNavItems);
    // openSubBar(itemId)
  };
  const updateSubItemsById = (itemId: number, subItemId: number) => {
    const updatedNavItems: any = navItems.map((item: any) => {
      if (item.id === itemId && item.subItems) {
        const updatedSubItems = item.subItems.map((subItem: any) => {
          if (subItem.id === subItemId) {
            return { ...subItem, active:true };
          } else {
            return { ...subItem, active:false };
          }
        });
        return { ...item, subItems: updatedSubItems };
      } else {
        return item;
      }
    });
    setNavItems(updatedNavItems);
  };
const Logout=()=>{
  localStorage.clear()
  setTimeout(()=>{
    navigate('/')
  },2000)
}

  return (

    <>
    <div className="w-[17rem] h-[1034px] bg-[#FCFCFC]">
    <img
      className="ml-[39px] mt-[17px] w-[75px] h-[33px] mb-[45px]"
      src={IMAGES.Logo}
      alt="Logo"
    />
    <div className="flex flex-col gap-3">
      <div className="md:w-[11rem] lg:w-[11.75rem] h-[35px] flex items-center justify-between md:ml-[12px] lg:ml-[22px] rounded-[8px] pl-[17px] pr-[19px]">
        <p className="text-gray font-[600]">ADMIN</p>
      </div>
      {navItems.map((item: any) => (
        <Link key={item.id} to={item.url}>
          <div
            key={item.id}
            className={`md:w-[11rem] lg:w-[11.75rem] h-[35px] flex items-center justify-between md:ml-[12px] lg:ml-[22px] rounded-[8px] pl-[17px] pr-[19px] ${
              item.active ? "bg-[#212121]" : ""
            }`}
            onClick={(e:any) => {handleItemClick(item.id)}}
          >
            <div className="flex items-center  justify-between  w-full">
            <div className="flex items-center gap-3">
            <SVGIcon
                src={item.icon}
                filled={item.active}
                fillcolor={item?.iconFillColor}
                strokecolor={item?.strokeColor}
              />
              <p
                className={`${
                  item.active ? "text-[white]" : "text-gray"
                }  font-[600] cursor-pointer md:text-[13px] lg:text-[16px]`}
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
        {item.DropDown &&
         <div
         className={`sub-items ${item.open ? "open" : ""}`}
       >
         {item.subItems.map((subItem:any) => (
           <Link key={subItem.id} to={subItem.url}>
              <div key={subItem.id} onClick={(e:any)=>{updateSubItemsById(item.id,subItem.id)}}
     className={`w-[11.75rem] mt-[10px]  flex items-center justify-between ml-[22px] rounded-[8px] pl-[17px] pr-[19px] `}
     >
<div className="flex items-center  justify-between  w-full">
     <div className="flex items-center ">
    
       <p
         className={`font-[600] text-[12px] cursor-pointer ${subItem.active?'text-[#3C82D6]':'text-[#656565]'} `}
       >
         {subItem.name}
       </p>
       
     </div>

       
     </div>
     </div>
           </Link>
         ))}
       </div>
        }
        </Link>
      ))}
      <div className="ml-[39px] mt-[137px] gap-3 flex items-center cursor-pointer" onClick={Logout}>
      <SVGIcon
      fillcolor={'#000000'}
                src={IMAGES.LogoutIcon}
              
              />
       <p className="text-[#212121] text-[16px] font-[600]">Logout</p>
      </div>
    </div>
  </div>
    </>
   
  );
};



