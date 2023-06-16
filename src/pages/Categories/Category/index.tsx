import React, { useState, useRef, useEffect } from 'react'
import { Header, DashCard } from '../../../components'
import { CustomTableComponent } from '../../../atoms'
import { SVGIcon } from '../../../components/SVG'
import { MenuItem } from 'primereact/menuitem'
import IMAGES from '../../../assets/Images'
import { CustomMenu } from "../../../atoms/global.style"
import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../../../store/Slices/Categories'
import { getAllVariants } from '../../../store/Slices/Variants'
import moment from 'moment'
export const Category = () => {
    const [MenuLabel, setMenuLabel] = useState("")
    const [LoadMore1, setLoadMore1] = useState(true);
    const [LoadMore2, setLoadMore2] = useState(true);
    const [CurrSelectedProduct, setCurrSelectedProduct] = useState('')
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const menuLeft: any = useRef(null);
    const navigate = useNavigate()
    const [MenuLabel1, setMenuLabel1] = useState("")
    const [CurrSelectedProduct1, setCurrSelectedProduct1] = useState('')
    const [selectedProducts1, setSelectedProducts1] = useState<any>([]);
    const[TotalCategories,setTotalCategories]=useState(0)
    const[TotalVariants,setTotalVariants]=useState(0)
    const menuLeft1: any = useRef(null);
    const [CategoriesData,setCategoriesData] = useState([]);
    const [VariantData,setVariantData] = useState([
        {
            id: 1,
            title: "Color",
            DataType: "String",
            Values: "4",

        },
        {
            id: 2,
            title: "Color",
            DataType: "String",
            Values: "4",
        },
        {
            id: 3,
            title: "Color",
            DataType: "String",
            Values: "4",
        },
        {
            id: 4,
            title: "Color",
            DataType: "String",
            Values: "4",
        },
        {
            id: 5,
            title: "Color",
            DataType: "String",
            Values: "4",
        },



    ]);
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

    const deleteItem = (event: React.MouseEvent, item: any) => {
        event.stopPropagation();
        setMenuLabel((prevLabel) => (prevLabel === item.label ? '' : item.label));

    };
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
    const MenuBodyTemplate1 = (rowData: any) => {

        const handleClick = (event: any) => {

            event.preventDefault();
            setCurrSelectedProduct1(rowData.id)
            menuLeft1.current.toggle(event);

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

                    <CustomMenu popupAlignment="left" height={'80px'} model={items} popup ref={menuLeft1} id="popup_menu_left" />
                </div>

            </>
        );
    };
    const [columnData] = useState([
        { field: "id", header: 'ID' },
        { field: "title", header: 'Title' },
        { field: "Fee", header: 'Fee' },
        { field: "Products", header: 'Products' },
        { field: "CreatedOn", header: 'Created On' },
        { field: "", header: '', body: MenuBodyTemplate }
    ])
    const [VariantcolumnData] = useState([
        { field: "id", header: 'ID' },
        { field: "title", header: 'Title' },
        { field: "DataType", header: 'Data Type',className:'dataType' },
        { field: "Values", header: 'Values' },

        { field: "", header: '', body: MenuBodyTemplate }
    ])
    useEffect(() => {
        console.log('Menu', MenuLabel, "product", selectedProducts, "CurrSelectedProduct", CurrSelectedProduct)
    }, [MenuLabel])
    const GetCategories=async()=>{
        let response=await getAllCategories()
        setTotalCategories(response.results)
        let NewArr=response.categories.map((item:any)=>{
            let newObj={
                ...item,
                id:item.c_id,
                title: item.c_name,
            Fee: item.c_fees,
            Products: item.c_products,
            CreatedOn: moment(item.c_created_on).format("DD,MM,YYYY"),
            }
            return newObj
        })
        NewArr.sort((a:any,b:any)=>a.id - b.id)
        setCategoriesData(NewArr)
        
    }
    const GetVariants=async()=>{
        let response=await getAllVariants()
        setTotalVariants(response.results)
        let NewArr=response.variants.map((item:any)=>{
            let newObj={
                ...item,
                DataType: item.datatype                ,
                Values: item.values,
            }
            return newObj
        })
        NewArr.sort((a:any,b:any)=>a.id - b.id)
        setVariantData(NewArr)
        
    }
    useEffect(()=>{
        GetCategories()
        GetVariants()
    },[])
    return (
        <div>

            <Header
                typeSearch={true}

                UserBox={true}
            />
            <div className='mt-[35px]'>
                <div className='flex flex-wrap md:gap-[2rem] lg:gap-[2rem] xl:gap-[9rem] mt-[28px]'>
                    <div className='flex gap-6'>
                        <DashCard
                        outerclasses={'!w-[207px] !h-[101px]'}
                            title={"Total Categories"}
                            titleStyle={`!text-[13px]`}
                            totalNumber={String(TotalCategories)}
                            showDefaultNumber={false}
                            Numberstyle={`!text-[28px]`}

                        />
                        <DashCard
                        
                            onClick={() => navigate('/CreateCategory')}
                            Addimg={IMAGES.AddItem}
                            Add={true}
                            txt="Add New Category"
                            outerclasses={'!w-[207px] !h-[101px]'}

                        />
                    </div>
                    <div className='flex gap-6'>
                        <DashCard
                            title={"Total Variants"}
                            titleStyle={`!text-[13px]`}
                            totalNumber={String(TotalVariants)}
                            showDefaultNumber={false}
                            Numberstyle={`!text-[28px]`}
                            outerclasses={'!w-[207px] !h-[101px]'}
                        />
                        <DashCard
                            onClick={() => navigate('/AddNewVariant')}
                            Addimg={IMAGES.AddItem}
                            Add={true}
                            txt="Add New Variant"
                            outerclasses={'!w-[207px] !h-[101px]'}
                        />
                    </div>





                </div>
            </div>
            <div className='mt-[20px] flex flex-wrap gap-[21px]'>
                <div className='flex flex-col gap-4 border border-lightgray rounded-[10px] pt-[21px] '>
                    <div className='flex justify-between pl-[14px] pr-[10px]'>
                        <p className='text-[13px] font-[600]'>Categories</p>
                        <div className='border rounded-[15px] px-2 py-1 text-[11px] text-[#212121] flex items-center'>Sort By: <b className='mr-1'>Date </b><img src={IMAGES.DropDown2}/>  </div>
                    </div>
                    <CustomTableComponent
                        theadStyles={{ background: '#FCFCFC' }}
                        width="35rem"
                        showWrapper={false}
                        filterData={CategoriesData}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        columnData={columnData}
                        MultipleSelect={true}
                        LoadMore={LoadMore1}
                        initialRowSize={5}
                        showLoadMore={false}
                    />
                   {LoadMore1==true && <div onClick={()=>setLoadMore1(false)} className='flex justify-center items-center -mt-[10px] pb-3 font-[500] text-[#B4B4B4] cursor-pointer'>View More</div>}  
                </div>
                <div className='flex flex-col gap-4   border rounded-[10px] border-lightgray '>
                    <div className='flex justify-between pl-[14px] border-b-0 pt-[21px]     pr-[10px] '>
                        <p className='text-[13px] font-[600]'>Variant</p>
                        <div className='border rounded-[15px] px-2 py-1 text-[11px] text-[#212121] flex items-center'>Sort By: <b className='mr-1'>Date </b><img src={IMAGES.DropDown2}/>  </div>
                    </div>
                    <CustomTableComponent
                        theadStyles={{ background: '#FCFCFC' }}
                        width="37rem"

                        showWrapper={false}
                        filterData={VariantData}
                        selectedProducts={selectedProducts1}
                        setSelectedProducts={setSelectedProducts1}
                        columnData={VariantcolumnData}
                        MultipleSelect={true}
                        LoadMore={LoadMore2}
                        initialRowSize={5}
                        showLoadMore={false}
                    />
                   
                    {LoadMore2==true && <div onClick={()=>setLoadMore2(false)} className='flex justify-center items-center  pb-3 font-[500] text-[#B4B4B4] cursor-pointer'>View More</div>}  
                </div>
            </div>
        </div>
    )
}

