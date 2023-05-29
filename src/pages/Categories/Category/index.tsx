import React, { useState, useRef, useEffect } from 'react'
import { Header, DashCard } from '../../../components'
import { CustomTableComponent } from '../../../atoms'
import { SVGIcon } from '../../../components/SVG'
import { MenuItem } from 'primereact/menuitem'
import IMAGES from '../../../assets/Images'
import { CustomMenu } from "../../../atoms/global.style"
export const Category = () => {
    const [MenuLabel, setMenuLabel] = useState("")
    const [CurrSelectedProduct, setCurrSelectedProduct] = useState('')
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const menuLeft: any = useRef(null);

    const [MenuLabel1, setMenuLabel1] = useState("")
    const [CurrSelectedProduct1, setCurrSelectedProduct1] = useState('')
    const [selectedProducts1, setSelectedProducts1] = useState<any>([]);
    const menuLeft1: any = useRef(null);
    const [filterData] = useState([
        {
            id: 1,
            title: "Phone",
            Fee: "7.025%",
            Products: "20",
            CreatedOn: "20,aug,2022",

        },
        {
            id: 2,
            title: "Phone",
            Fee: "7.025%",
            Products: "20",
            CreatedOn: "20,aug,2022",
        },
        {
            id: 3,
            title: "Phone",
            Fee: "7.025%",
            Products: "20",
            CreatedOn: "20,aug,2022",
        },
        {
            id: 4,
            title: "Phone",
            Fee: "7.025%",
            Products: "20",
            CreatedOn: "20,aug,2022",
        },
        {
            id: 5,
            title: "Phone",
            Fee: "7.025%",
            Products: "20",
            CreatedOn: "20,aug,2022",
        },



    ]);
    const [VariantData] = useState([
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
        { field: "DataType", header: 'Data Type' },
        { field: "Values", header: 'Values' },

        { field: "", header: '', body: MenuBodyTemplate }
    ])
    useEffect(() => {
        console.log('Menu', MenuLabel, "product", selectedProducts, "CurrSelectedProduct", CurrSelectedProduct)
    }, [MenuLabel])
    return (
        <div>

            <Header
                typeSearch={true}

                UserBox={true}
            />
            <div className='mt-[35px]'>
                <div className='flex flex-wrap gap-6 mt-[28px]'>

                    <DashCard
                        title={"Total Categories"}
                        titleStyle={`!text-[13px]`}
                        totalNumber={"6"}
                        showDefaultNumber={false}
                        Numberstyle={`!text-[28px]`}

                    />
                    <DashCard
                        Add={true}
                        txt="Add New Category"
                        outerclasses="w-[284px] h-[140px]"

                    />
                    <DashCard
                        title={"Total Variants"}
                        titleStyle={`!text-[13px]`}
                        totalNumber={"6"}
                        showDefaultNumber={false}
                        Numberstyle={`!text-[28px]`}

                    />
                    <DashCard
                        Add={true}
                        txt="Add New Variant"
                        outerclasses="w-[284px] h-[140px]"

                    />



                </div>
            </div>
            <div className='mt-[20px] flex gap-3'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <p className='text-[13px] font-[600]'>Categories</p>
                    </div>
                    <CustomTableComponent


                        showWrapper={false}
                        filterData={filterData}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        columnData={columnData}
                        MultipleSelect={true}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <p className='text-[13px] font-[600]'>Variant</p>
                    </div>
                    <CustomTableComponent


                        showWrapper={false}
                        filterData={VariantData}
                        selectedProducts={selectedProducts1}
                        setSelectedProducts={setSelectedProducts1}
                        columnData={VariantcolumnData}
                        MultipleSelect={true}
                    />
                </div>
            </div>
        </div>
    )
}

