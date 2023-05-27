import React,{useState,useEffect,useRef} from 'react'
import { DashCard } from '../../../components/index.js'
import IMAGES from '../../../assets/Images'
import { CustomTableComponent,CustomButton } from '../../../atoms'
import { SVGIcon } from '../../../components/SVG'
import {CustomMenu} from "../../../atoms/global.style.js"
import { useNavigate } from 'react-router-dom'
export const Users = () => {
    const navigate=useNavigate();
  const [filterData, setFilterData] = useState([
    {
      id: 1,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 2,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 3,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Banned",
      registerValue: "Website",
    },
    {
      id: 4,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 5,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 6,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 7,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 8,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Banned",
      registerValue: "Website",
    },
    {
      id: 9,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 10,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 11,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 12,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 13,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Banned",
      registerValue: "Website",
    },
    {
      id: 14,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 15,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
  ]);
  const menuLeft: any = useRef(null);
  const StatusBodyTemplate = (option: any) => {
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] ${option.status.toLowerCase() == "active" ? "bg-blue" : "bg-red"
            } flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <p>{option.status}</p>
        </div>
      </>
    );
  };
  const handleBanUser = (e:any) => {
    e.preventDefault()
    const selectedUserIds = selectedProducts.map((product: any) => product.id);
    console.log("Selected User IDs:", selectedUserIds);
  };
  const items = [
    {

      items: [
        {
          label: "Ban User",
          command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }} className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]">
                <SVGIcon
                  fillcolor={'#212121'}
                  src={IMAGES.Ban}
                /> Ban User
              </div>
            )
          }
        },
        {
          label: "Delete",
          command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div  style={{ background: 'rgba(231, 29, 54, 0.05)' }} className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]">
                <SVGIcon

                  fillcolor={'#E71D36'}
                  src={IMAGES.Delete}
                /> Delete
              </div>
            )
          }
        },
        {
          label: "Select",
          command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div  style={{ background: 'rgba(46, 102, 194, 0.05)' }} className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]">
                <SVGIcon
                  fillcolor={'#212121'}
                  src={IMAGES.Select}
                /> Select
              </div>
            )
          }
        },
      ],
    },

  ];
  
  const MenuBodyTemplate = (rowData:any) => {
    
    
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon
            onClick={(event: any) => {
              event.preventDefault();
              menuLeft.current.toggle(event);
            }}

            src={IMAGES.Dots}
          />
        
          <CustomMenu   model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      </>
    );
  };
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [columnData]=useState([
    {field:"id",header:'ID' },
    {field:"firstname",header:'First Name' },
    {field:"lastname",header:'Last Name' },
    {field:"email",header:'Email' },
    {field:"phone",header:'Phone' },
    {field:"register",header:'Registered On' },
    {field:"status",header:'Status' ,body:StatusBodyTemplate},
    {field:"registerValue",header:'Registered Via' },
    {field:"",header:'' ,body:MenuBodyTemplate}
  ])
  useEffect(()=>{
    if(selectedProducts.length>0){
        navigate('/UserProfile')
    }
    console.log(selectedProducts)
      },[selectedProducts])
  return (
    <div className=''>
      <div className='flex flex-wrap gap-6'>
      <DashCard
          title={"Total Users"}
          totalNumber={"4500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
        <DashCard
          title={"User Registered In March"}
          totalNumber={"350"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
        <DashCard
          title={"User Registered This Year"}
          totalNumber={"3500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
      </div>
      <div className='mt-[40px] relative'>
        <CustomTableComponent filterData={filterData} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} columnData={columnData} MultipleSelect={true} />
       

       
      </div>
      {/* <div className='flex justify-center mt-3 w-full '>
      <CustomButton txt={'View More'}  classes='mt-3 bg-[#FFFFFF] h-[50px] text-[black] '/>
      </div> */}
    </div>
  )
}
