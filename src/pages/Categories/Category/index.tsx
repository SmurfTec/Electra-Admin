import React, { useState, useRef, useEffect } from 'react'
import { Header, DashCard } from '../../../components'
import { CustomTableComponent } from '../../../atoms'
import { SVGIcon } from '../../../components/SVG'
import { MenuItem } from 'primereact/menuitem'
import IMAGES from '../../../assets/Images'
import { CustomMenu } from "../../../atoms/global.style"
import { useNavigate } from 'react-router-dom'
import {  DeleteSingleCategory } from '../../../store/Slices/Categories'
import {  DeleteSingleVariant } from '../../../store/Slices/VariantSlice'
import moment from 'moment'
import { SuccessModel } from '../../../components'
import { useFetchCategories } from '../../../custom-hooks/useFetchCategories'
import { useFetchVariants } from '../../../custom-hooks/useFetchVariants'
import { Paginatior } from '../../../components'
import { ProgressSpinner } from 'primereact/progressspinner'
export const Category = () => {
    const [Categoryvisible, setCategoryvisible] = useState(false)
    const [Variantvisible, setVariantvisible] = useState(false)
    const [LoadMore1, setLoadMore1] = useState(false);
    const [LoadMore2, setLoadMore2] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const navigate = useNavigate()
    const [selectedProducts1, setSelectedProducts1] = useState<any>([]);
    
    

    const [CategoriesData, setCategoriesData] = useState([]);
    const [Variants, setVariants] = useState([]);
const [initialPageData1, setInitialPageData1] = useState({
    rowsPerPage: 5,
    currentPage: 1,
   
  })
  const [initialPageData2, setInitialPageData2] = useState({
    rowsPerPage: 5,
    currentPage: 1,
   
  })
  const {CategoryData,CategoryLoading,stats}=useFetchCategories(initialPageData1)
  const {VariantData,VariantLoading,Variantstats}=useFetchVariants(initialPageData2)
    const deleteCategoryItem = async (event: React.MouseEvent, id: any) => {
        event.stopPropagation();
        try {
            let r = await DeleteSingleCategory(id)
           
            if(r){
                setCategoryvisible(true)
                setInitialPageData1({...initialPageData1,currentPage:1})
            }
          
        } catch (err) {

        }

    };
    const deleteVariantItem = async (event: React.MouseEvent, id: any) => {
        event.stopPropagation();
        try {
            let r = await DeleteSingleVariant(id);
            if(r){
                setVariantvisible(true)
               setInitialPageData2({...initialPageData2,currentPage:1})
            }
            
        } catch (err) {

        }


    };
    const CategoryMenuBodyTemplate = (rowData: any) => {
        const MenuTemplate = ({ id, menuRef }: { id: string, menuRef: React.RefObject<any> }) => {
            let [items] = useState([


                {
                    label: "Delete",
                    template: (item: MenuItem) => {

                        return (
                            <div onClick={(event) => deleteCategoryItem(event, rowData.id)} style={{ background: 'rgba(231, 29, 54, 0.05)' }} className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]">
                                <SVGIcon

                                    fillcolor={'#E71D36'}
                                    src={IMAGES.Delete}
                                /> Delete
                            </div>
                        )
                    }
                },
            ]);

            return (
                <CustomMenu popupAlignment="left" height={'auto'} model={items} popup ref={menuRef} id="popup_menu_left" />
            );
        };
        const menuLeftRef = useRef<any>(null);
        const handleClick = (event: any) => {

            event.preventDefault();
            menuLeftRef.current?.toggle(event);

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


                    <MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
                </div>

            </>
        );
    };
    const VariantMenuBodyTemplate = (rowData: any) => {
        const MenuTemplate = ({ id, menuRef }: { id: string, menuRef: React.RefObject<any> }) => {
            let [items] = useState([

                {
                    label: "Delete",
                    template: (item: MenuItem) => {

                        return (
                            <div onClick={(event) => deleteVariantItem(event, rowData.id)} style={{ background: 'rgba(231, 29, 54, 0.05)' }} className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]">
                                <SVGIcon

                                    fillcolor={'#E71D36'}
                                    src={IMAGES.Delete}
                                /> Delete
                            </div>
                        )
                    }
                },
            ]);

            return (
                <CustomMenu popupAlignment="left" height={'auto'} model={items} popup ref={menuRef} id="popup_menu_left" />
            );
        };
        const menuLeftRef = useRef<any>(null);
        const handleClick = (event: any) => {

            event.preventDefault();
            menuLeftRef.current?.toggle(event);

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


                    <MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
                </div>

            </>
        );
    };
    const [CategoriescolumnData] = useState([
        { field: "id", header: 'ID' },
        { field: "title", header: 'Title' },
        { field: "Fee", header: 'Fee' },
        { field: "Products", header: 'Products' },
        { field: "CreatedOn", header: 'Created On' },
        { field: "", header: '', body: CategoryMenuBodyTemplate }
    ])
    const [VariantcolumnData] = useState([
        { field: "id", header: 'ID' },
        { field: "title", header: 'Title' },
        { field: "DataType", header: 'Data Type', className: 'dataType' },
        { field: "Values", header: 'Values' },

        { field: "", header: '', body: VariantMenuBodyTemplate }
    ])

   
   
    useEffect(()=>{
        let NewArr = VariantData?.map((item: any) => {
            let newObj = {
                ...item,
                DataType: item.datatype,
                Values: item.values,
            }
            return newObj
        })
        NewArr?.sort((a: any, b: any) => a.id - b.id)
        setVariants(NewArr)
    },[VariantData])
    useEffect(()=>{
        let NewArr:any = CategoryData?.map((item: any) => {
            let newObj = {
                ...item,
                id: item.id,
                title: item.name,
                Fee: item.fees,
                Products: item.products,
                CreatedOn: moment(item.created_on).format("DD,MM,YYYY"),
            }
            return newObj
        })
        NewArr?.sort((a: any, b: any) => a.id - b.id)
        setCategoriesData(NewArr)
    },[CategoryData])
    
    return (
        <div>
            <SuccessModel visible={Categoryvisible} setVisible={setCategoryvisible} txt="Category Deleted Successfully" />
            <SuccessModel visible={Variantvisible} setVisible={setVariantvisible} txt="Variant Deleted Successfully" />
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
                            totalNumber={String(stats)}
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
                            totalNumber={String(Variantstats)}
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
            {(!CategoryLoading && !VariantLoading) ?
            <>
             <div className='mt-[20px] flex flex-wrap gap-[21px]'>
                <div className='flex flex-col gap-4 border border-lightgray rounded-[10px] pt-[21px] '>
                    <div className='flex justify-between pl-[14px] pr-[10px]'>
                        <p className='text-[13px] font-[600]'>Categories</p>
                        <div className='border rounded-[15px] px-2 py-1 text-[11px] text-[#212121] flex items-center'>Sort By: <b className='mr-1'>Date </b><img src={IMAGES.DropDown2} />  </div>
                    </div>
                    
                    <CustomTableComponent
                        theadStyles={{ background: '#FCFCFC' }}
                        width="35rem"
                        showWrapper={false}
                        filterData={CategoriesData}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        columnData={CategoriescolumnData}
                        MultipleSelect={true}
                        LoadMore={LoadMore1}
                        initialRowSize={5}
                        showLoadMore={false}
                    />
                     <Paginatior totalRecords={stats} initialPageData={initialPageData1} setInitialPageData={setInitialPageData1} />
                    {/* {LoadMore1 == true && <div onClick={() => setLoadMore1(false)} className='flex justify-center items-center -mt-[10px] pb-3 font-[500] text-[#B4B4B4] cursor-pointer'>View More</div>} */}
                </div>
                <div className='flex flex-col gap-4   border rounded-[10px] border-lightgray '>
                    <div className='flex justify-between pl-[14px] border-b-0 pt-[21px]     pr-[10px] '>
                        <p className='text-[13px] font-[600]'>Variant</p>
                        <div className='border rounded-[15px] px-2 py-1 text-[11px] text-[#212121] flex items-center'>Sort By: <b className='mr-1'>Date </b><img src={IMAGES.DropDown2} />  </div>
                    </div>
                    <CustomTableComponent
                        theadStyles={{ background: '#FCFCFC' }}
                        width="100%"

                        showWrapper={false}
                        filterData={Variants}
                        selectedProducts={selectedProducts1}
                        setSelectedProducts={setSelectedProducts1}
                        columnData={VariantcolumnData}
                        MultipleSelect={true}
                        LoadMore={LoadMore2}
                        initialRowSize={5}
                        showLoadMore={false}
                    />
 <Paginatior totalRecords={Variantstats} initialPageData={initialPageData2} setInitialPageData={setInitialPageData2} />
                    {/* {LoadMore2 == true && <div onClick={() => setLoadMore2(false)} className='flex justify-center items-center  pb-3 font-[500] text-[#B4B4B4] cursor-pointer'>View More</div>} */}
                </div>
            </div>
            </>
            :
            <>
            <div className="w-full mt-[100px] h-full flex justify-start items-center overflow-y-hidden">
<ProgressSpinner  style={{overflow:"hidden"}} />
</div>
            </>
            }
           
        </div>
    )
}

