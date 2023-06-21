import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { CustomTableWrapper, CustomTable } from "../global.style";
import { CustomButton } from "..";
import IMAGES from "../../assets/Images";
import { CheckBox } from "..";
export const CustomTableComponent = ({
  columnStyle,
  headerStyle,
  rowStyling,
  filterData,
  showWrapper,
  selectedProducts,
  setSelectedProducts,
  columnData,
  MultipleSelect,
  showlines, 
  MultipleHeaderStyle,
  columnHeaderFirst,
  LoadMore=false,
  setLoadMore,
  showLoadMore=true,
  initialRowSize=10,
  pagination=false,
  ...props
}: any) => {
  const[rowsize,setrowsize]=useState(LoadMore==true?initialRowSize:filterData?.length)
  
  useEffect(()=>{
    setrowsize(LoadMore==true?initialRowSize:filterData?.length)
  },[filterData])
  return (
    <>
      <div className="relative">
        {(LoadMore &&showLoadMore)&& <CustomTableWrapper></CustomTableWrapper>}
        <CustomTable
          {...props}
          selectionMode={'checkbox'} selection={selectedProducts}
          value={filterData?.slice(0,rowsize)}
          scrollable={false}
          onSelectionChange={(e:any) => setSelectedProducts(e.value)}
          dataKey="id"
          rows={20}
          paginator={pagination?true:false}
          tablebodycolor={rowStyling??""}
          columnheader={props.columnHeader}
          columnHeaderFirst={columnHeaderFirst}
          showGridlines ={showlines ?true:false}
          // onPage={(e)=>{console.log("EE",e)}}
          
        >
          {MultipleSelect && (
            <Column
            selectionMode="multiple"
            headerStyle={MultipleHeaderStyle ? MultipleHeaderStyle : { width: "3rem" }}
           
          />
          )}
          {columnData?.map((item: any, index: any) => {
            
            return (
              <Column
                key={index}
                style={columnStyle ?? null}
                field={item.field}
                header={item.header}
                headerStyle={headerStyle}
                bodyClassName={'!bg-[#F6F6F6]'}
                body={item.body ? item.body : null}
                className={item.className ? item.className:''}
              />
            );
          })}
        </CustomTable>
    {(LoadMore && showLoadMore) &&
    <div className='flex justify-center mt-3 w-full '>
    <CustomButton onClick={()=>{
      setLoadMore(false)
      setrowsize(filterData.length)
    }} editIcon={<img src={IMAGES.arrowDown} />} txt={'View More'}  classes=' !bg-[#FFFFFF] !h-[50px] !font-[700] !text-[16px] !text-[black] '/>
    </div>
    }    
      </div>
    </>
  );
};
