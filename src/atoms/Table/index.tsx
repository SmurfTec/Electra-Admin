import { Column } from "primereact/column";

import { CustomTableWrapper, CustomTable } from "../global.style";
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
  ...props
}: any) => {
  return (
    <>
      <div className="relative">
        {showWrapper && <CustomTableWrapper></CustomTableWrapper>}
        <CustomTable
          {...props}
          rows={10}
          value={filterData}
          scrollable={false}
          selection={selectedProducts ? selectedProducts : []}
          dataKey="id"
          onSelectionChange={
            selectedProducts
              ? (e: any) => setSelectedProducts(e.value)
              : undefined
          }
          tablebodyColor={rowStyling??""}
          columnHeader={props.columnHeader}
        >
          {MultipleSelect && (
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          )}
          {columnData?.map((item: any, index: any) => {
            return (
              <Column
                key={index}
                style={columnStyle ?? null}
                field={item.field}
                header={item.header}
                headerStyle={headerStyle}
                bodyClassName={'!bg-[#F6F6F6'}
                body={item.body ? item.body : null}
              />
            );
          })}
        </CustomTable>
      </div>
    </>
  );
};
