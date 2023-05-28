import  { useState, useRef, useEffect } from "react";
import { Column } from "primereact/column";
import { SVGIcon } from "../../components/SVG";
import IMAGES from "../../assets/Images";

import { CustomMenu,CustomTableWrapper,CustomTable } from "../global.style.js"
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
          {/* <Column field="id" header="ID" />
          <Column field="firstname" header="First Name" />
          <Column field="lastname" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Phone" />
          <Column field="register" header="Registered On" />
          <Column field="status" header="Status" body={StatusBodyTemplate} />
          <Column field="registerValue" header="Registered Via" />
          <Column header="" body={MenuBodyTemplate} /> */}
        </CustomTable>
      </div>
    </>
  );
};
