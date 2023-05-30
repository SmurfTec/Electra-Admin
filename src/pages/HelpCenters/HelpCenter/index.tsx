import React,{useState,useRef} from 'react'
import { Header } from '../../../components'
import { SVGIcon } from '../../../components/SVG'
import { CustomTableComponent } from '../../../atoms'
import IMAGES from '../../../assets/Images'
import { CustomMenu } from "../../../atoms/global.style"
import { MenuItem } from 'primereact/menuitem'
export const HelpCenter = () => {
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [MenuLabel, setMenuLabel] = useState("")
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState('')
  const menuLeft: any = useRef(null);
  const [filterData] = useState([
    {
        id: 1,
        firstname: "Huzayfah ",
        lastname: "Hanif",
        email: "Huz@gmail.com",
        orderno: "24",
        category: "Phone",
        Date: "20,aug,2022",
        status:"Solved",

    },
    {
        id: 2,
        firstname: "Huzayfah ",
        lastname: "Hanif",
        email: "Huz@gmail.com",
        orderno: "24",
        category: "Phone",
        Date: "20,aug,2022",
        status:"Solved",
    },
    {
        id: 3,
        firstname: "Huzayfah ",
        lastname: "Hanif",
        email: "Huz@gmail.com",
        orderno: "24",
        category: "Phone",
        Date: "20,aug,2022",
        status:"Solved",
    },
    {
        id: 4,
        firstname: "Huzayfah ",
        lastname: "Hanif",
        email: "Huz@gmail.com",
        orderno: "24",
        category: "Phone",
        Date: "20,aug,2022",
        status:"Solved",
    },
    {
        id: 5,
        firstname: "Huzayfah ",
        lastname: "Hanif",
        email: "Huz@gmail.com",
        orderno: "24",
        category: "Phone",
        Date: "20,aug,2022",
        status:"Solved",
    },
    {
      id: 6,
      firstname: "Huzayfah ",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      orderno: "24",
      category: "Phone",
      Date: "20,aug,2022",
      status:"Solved",
  },
  {
    id: 7,
    firstname: "Huzayfah ",
    lastname: "Hanif",
    email: "Huz@gmail.com",
    orderno: "24",
    category: "Phone",
    Date: "20,aug,2022",
    status:"Solved",
},
{
  id: 8,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},
{
  id: 9,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},
{
  id: 10,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},
{
  id: 11,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},
{
  id: 12,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Pending",
},
{
  id: 13,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},
{
  id: 14,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},
{
  id: 15,
  firstname: "Huzayfah ",
  lastname: "Hanif",
  email: "Huz@gmail.com",
  orderno: "24",
  category: "Phone",
  Date: "20,aug,2022",
  status:"Solved",
},



]);
const deleteItem = (event: React.MouseEvent, item: any) => {
  event.stopPropagation();
  setMenuLabel((prevLabel) => (prevLabel === item.label ? '' : item.label));

};
const items = [
  {
      label: "View Item",

      template: (item: any) => {

          return (
              <div onClick={(event) => deleteItem(event, item)} style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }} className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]">
                  <SVGIcon
                      fillcolor={'#212121'}
                      src={IMAGES.Ban}
                  /> View Item
              </div>
          )
      }
  },
  {
      label: "Delete",
      template: (item: MenuItem) => {

          return (
              <div onClick={(event) => deleteItem(event, item)} style={{ background: 'rgba(231, 29, 54, 0.05)' }} className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]">
                  <SVGIcon

                      fillcolor={'#E71D36'}
                      src={IMAGES.Delete}
                  /> Delete
              </div>
          )
      }
  },

]
const MenuBodyTemplate = (rowData: any) => {

  const handleClick = (event: any) => {

      event.preventDefault();
      setCurrSelectedProduct(rowData.id)
      menuLeft.current.toggle(event);

  };
  return (
      <>

          <div
              className={` px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
          >
              <SVGIcon
                  onClick={handleClick}

                  src={IMAGES.Dots}
              />

              <CustomMenu popupAlignment="left" height={'80px'} model={items} popup ref={menuLeft} id="popup_menu_left" />
          </div>

      </>
  );
};
const OrderBodyTemplate=(options:any)=>{
  return(
    <>
    <p className='text-[14px] font-[600] text-blue'>
    {options.orderno}
    </p>
    </>
  )
}
const CategoryBodyTemplate=(options:any)=>{
  return(
    <>
    <p className='text-[14px] font-[600] text-blue'>
    {options.category}
    </p>
    </>
  )
}
const StatusBodyTemplate=(options:any)=>{
  return(
    <>
    <p className={`text-[14px] font-[600] p-2 rounded-[22px] text-white ${options.status=='Solved'?'bg-blue':'bg-black'}`}>
    {options.status}
    </p>
    </>
  )
}
const [columnData] = useState([
  { field: "id", header: 'ID' },
  { field: "firstname", header: 'First Name' },
  { field: "lastname", header: 'Last Name' },
  { field: "email", header: 'Email' },
  { field: "orderno", header: 'Order No',body:OrderBodyTemplate },
  { field: "category", header: 'Category',body:CategoryBodyTemplate },
  { field: "Date", header: 'Date' },
  { field: "status", header: 'Status',body:StatusBodyTemplate },
  { field: "", header: '', body: MenuBodyTemplate }
])
  return (
    <div>
      <Header
         chooseFilter={true}
        typeSearch={true}
        UserBox={true}
      />
      <div>
      <CustomTableComponent


showWrapper={false}
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

