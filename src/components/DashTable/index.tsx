import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ViewAll } from "../../atoms";
import styled from "styled-components";
import { Paginatior } from "..";
import { useState, useEffect } from "react";
// Styled Paginator component
const CustomTable = styled(DataTable)<any>`
  .p-datatable-header {
    background-color: ${({ tablebgcolor }: any) => tablebgcolor};
    border-top: none;
  }
  .p-datatable-tbody > tr {
    background-color: #fcfcfc !important;
  }
  .p-paginator-bottom {
    background: #fcfcfc;
  }
  .p-paginator-bottom {
    display: flex;
    justify-content: flex-end;
  }
  .p-paginator-first {
    display: none !important;
  }
  .p-paginator-last {
    display: none !important;
  }
  .p-paginator-prev {
    color: black !important;
    ::after {
      content: "";
      display: inline-block;
      width: 50%;
      height: 2px;
      background-color: black;
      /* margin: 5px; */
      margin-left: -6.5px;
      margin-top: 4px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }
  .p-paginator-next {
    color: black !important;
    ::before {
      content: "";
      display: inline-block;
      width: 50%;
      height: 2px;
      background-color: black;
      /* margin: 5px; */
      margin-right: -6.5px;
      margin-top: 4px;
      margin-bottom: 5px;
      /* margin-right: 5px; */
    }
  }
  .p-paginator-pages {
    .p-highlight {
      background-color: black !important;
      color: white !important;
    }
    .p-paginator-page {
      background-color: #ffffff;
      border: 0.2px solid #a4a4a4;
    }
  }
`;
export const DashTable = (props: any) => {
  let total= props.totalProducts
  const [PAGE, setPAGE] = useState();
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 4,
    currentPage: 1,
  })
  useEffect(() => {
    setPAGE(props.page);
  }, [props.page]);
  const tableHeader = (
    <div className={`flex justify-between !bg-[#FCFCFC]"`}>
      <p style={{ fontWeight: "900", marginRight: "10px", color: "black" }}>
        {props.customHeader}
      </p>
      <ViewAll route={props?.route} />
    </div>
  );
  const CustomBody = (rowData: any) => {
    return (
      <div className="flex flex-col justify-between ">
        <p style={{ fontWeight: "900", marginRight: "10px", color: "black" }}>
          {rowData.name.number}
        </p>
        <p style={{ fontWeight: "500", marginRight: "10px" }}>
          {rowData.name.status}
        </p>
      </div>
    );
  };
  const CustomEmailBody = (rowData: any) => {
    return (
      <div className="flex flex-col justify-between ">
        <p style={{ fontWeight: "900", marginRight: "10px", color: "black" }}>
          {rowData.email.number}
        </p>
        <p style={{ fontWeight: "500", marginRight: "10px" }}>
          {rowData.email.status}
        </p>
      </div>
    );
  };
  const CustomDateBody = (rowData: any) => {
    return (
      <div className="flex flex-col justify-between ">
        <p style={{ fontWeight: "900", marginRight: "10px", color: "black" }}>
          {rowData.Date.number}
        </p>
        <p style={{ fontWeight: "500", marginRight: "10px" }}>
          {rowData.Date.status}
        </p>
      </div>
    );
  };
  const imageBodyTemplate = (rowData: any) => {
    return <img src={rowData.img} alt="Avatar" className="w-24" />;
  };
  return (
    <div className={`mt-4 px-4 rounded-3xl  ${props.classess}`}>
      <CustomTable
        dataKey="id"
        value={props.data}
        header={tableHeader}
        tableStyle={{ minWidth: "20rem" }}
        tablebgcolor={props.tableHeaderColor}
      >
        {props.imginData && (
          <Column
            field="img"
            body={imageBodyTemplate}
            style={{ width: "13%" }}
            headerStyle={
              props.header
                ? { backgroundColor: "#F7F7F7" }
                : { display: "none" }
            }
          ></Column>
        )}
        <Column
          field="id"
          header={props.header ? "ID" : false}
          style={
            props.selling
              ? { width: "30%", fontWeight: "900", color: "black" }
              : { width: "30%" }
          }
          headerStyle={
            props.header ? { backgroundColor: "#F7F7F7" } : { display: "none" }
          }
        ></Column>
        <Column
          field={props.selling ? "name.number" : "name"}
          header="Name"
          style={{ width: "25%" }}
          headerStyle={
            props.header ? { backgroundColor: "#F7F7F7" } : { display: "none" }
          }
          body={props.selling ? CustomBody : false}
        ></Column>
        <Column
          field={props.selling ? "email.number" : "email"}
          header="Email"
          style={{ width: "25%" }}
          headerStyle={
            props.header ? { backgroundColor: "#F7F7F7" } : { display: "none" }
          }
          body={props.selling ? CustomEmailBody : false}
        ></Column>
        <Column
          field={props.selling ? "Date.number" : "Date"}
          header="Date Registered"
          style={{ width: "25%" }}
          headerStyle={
            props.header ? { backgroundColor: "#F7F7F7" } : { display: "none" }
          }
          body={props.selling ? CustomDateBody : false}
        ></Column>
      </CustomTable>
    {props.pagination &&  <Paginatior totalRecords={Number(props.totalProducts)} initialPageData={props.param} setInitialPageData={props.setParams} />}
    </div>
  );
};
