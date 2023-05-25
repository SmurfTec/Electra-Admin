import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ViewAll } from "../../atoms";

export const DashTable = (props:any) => {
 
    const tableHeader = (
      <div className="flex justify-between !bg-[#FCFCFC]">
        <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Table Title</p>
       <ViewAll />
      </div>
    );
  return (
    <div className="mt-4 px-4">
      <DataTable
        value={props.data}
        header={tableHeader}
    
       rows={5}
        tableStyle={{ minWidth: "20rem" }}
      >
        <Column field="id" header="ID" style={{ width: "25%" }} headerStyle={{backgroundColor:"#F7F7F7"}}></Column>
        <Column field="name" header="Name" style={{ width: "25%" }} headerStyle={{backgroundColor:"#F7F7F7"}}></Column>
        <Column field="email" header="Email" style={{ width: "25%" }}headerStyle={{backgroundColor:"#F7F7F7"}}></Column>
        <Column field="Date" header="Date Registered" style={{ width: "25%" }}headerStyle={{backgroundColor:"#F7F7F7"}}></Column>
      </DataTable>
    </div>
  );
};
