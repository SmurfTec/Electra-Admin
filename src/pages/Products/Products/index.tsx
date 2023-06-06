import {useState,useRef,useEffect} from 'react'
import { Header } from '../../../components/index.js'
import { DashCard } from '../../../components/index.js'
import IMAGES from '../../../assets/Images.js'
import { CustomTableComponent,CustomSwitch } from '../../../atoms/index.js'
import { SVGIcon } from '../../../components/SVG/index.js'
import {CustomMenu} from "../../../atoms/global.style"
import { useNavigate } from 'react-router-dom'
export const Products = () => {
    const navigate=useNavigate()
    const [filterData, setFilterData] = useState([
        {
          id: 1,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
         
        },
        {
          id: 2,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 3,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "InActive",
        },
        {
          id: 4,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "InActive",
        },
        {
          id: 5,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "InActive",
        },
        {
          id: 6,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "InActive",
        },
        {
          id: 7,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 8,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 9,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 10,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 11,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 12,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 13,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 14,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
        {
          id: 15,
          title: "Iphone 14",
          category: "Phones",
          Brand: "Apple",
          addedon: "20,aug,2022",
          listing: "24",
          availibility: "Active",
        },
      ]);
      const menuLeft: any = useRef(null);
      const [selectedProducts, setSelectedProducts] = useState<any>([]);
      const SwitchTemplate = (option: any) => {
        const [checked, setChecked] = useState(option.availibility.toLowerCase()=="active"?true:false);
        return (
          <>
           <CustomSwitch checked={checked} setChecked={setChecked}/>
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
      const [columnData]=useState([
        {field:"id",header:'ID' },
        {field:"title",header:'Title' },
        {field:"category",header:'Category' },
        {field:"Brand",header:'Brand' },
        {field:"addedon",header:'Added On' },
        {field:"listing",header:'Listing' },
        {field:"availibility",header:'Availibility',body:SwitchTemplate },

        {field:"",header:'' ,body:MenuBodyTemplate}
      ])
      useEffect(()=>{
        if(selectedProducts.length>0){
            navigate('/ProductDetail')
        }
        console.log(selectedProducts)
          },[selectedProducts])
    return (
        <div>
            <Header
                typeSearch={true}
                chooseFilter={true}
                UserBox={true}
            />
            <div className='flex flex-wrap gap-6 mt-[28px]'>

                <DashCard
                    title={"Total Products"}
                    totalNumber={"4500"}
                    myImg={IMAGES.ProductBox}
                    imgColor={"bg-yellow-dash"}
                    textDash={" !w-full "}
                    textColor={"#3C82D6"}
                    txt='Last Updated 24,aug,2020'
                    outerclasses="w-[284px] h-[140px]"

                />
                <DashCard
                    title={"Product Sold in march"}
                    totalNumber={"350"}
                    myImg={IMAGES.ProductBox}
                    imgColor={"bg-yellow-dash"}
                    textDash={"bg-custom-blue !w-[63px] "}
                    textColor={"#3C82D6"}
                    arrowImg={IMAGES.uparrow}
                    outerclasses="w-[284px] h-[140px]"

                />
                <DashCard
                    title={"Product Sold In 6 Months"}
                    totalNumber={"3500"}
                    myImg={IMAGES.ProductBox}
                    imgColor={"bg-yellow-dash"}
                    textDash={"bg-custom-blue !w-[63px] "}
                    textColor={"#3C82D6"}
                    arrowImg={IMAGES.uparrow}
                    outerclasses="w-[284px] h-[140px]"

                />
                <DashCard
                onClick={()=>navigate('/AddProduct')}
                    Add={true}
                    txt="Add New Product"
                    outerclasses="w-[284px] h-[140px]"
                    txtclasses={'text-[#212121]'}
                    Addimg={IMAGES.AddItem}

                />

            </div>
            <div className='mt-[40px] relative'>
                <CustomTableComponent
                 filterData={filterData}
                 selectedProducts={selectedProducts} 
                 setSelectedProducts={setSelectedProducts} 
                 columnData={columnData} 
                 MultipleSelect={true} 
                 
                 />



            </div>
        </div>
    )
}

