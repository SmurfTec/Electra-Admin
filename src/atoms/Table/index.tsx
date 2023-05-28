
import { Column } from "primereact/column";


import { CustomTableWrapper,CustomTable } from "../global.style.js"
export const CustomTableComponent = ({filterData,showWrapper,selectedProducts,setSelectedProducts,columnData,MultipleSelect,...props}:any) => {

  return (
    <>
      <div className="relative">
     {showWrapper && 
     <CustomTableWrapper></CustomTableWrapper>
     }   
        <CustomTable
          {...props}
          rows={10}
          
          value={filterData}
          scrollable={false}
          selection={selectedProducts?selectedProducts:[]} dataKey="id"
          onSelectionChange={selectedProducts ? (e: any) => setSelectedProducts(e.value) : undefined}
        
        >
        {MultipleSelect && <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />}  
         {columnData?.map((item:any,index:any)=>{
          return(
            <Column key={index}
            field={item.field}
            header={item.header}
            body={item.body ? item.body : null}
            />
          )
         })}
         
        </CustomTable>
      </div>
    </>
  );
};
