import styled from "styled-components";
import { Menu } from "primereact/menu";
import { DataTable } from "primereact/datatable";
export const CustomMenu=styled(Menu)`
width: ${({width})=>width?width:'110px'};
height:${({height})=>height?height:'108px'};
padding: 10px;
.p-menu-list{
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 5px;
}
.p-submenu-header{
    display: none !important;
    
}

.p-menuitem{
    border-radius: 5px;
    width: 90px;
    cursor: pointer;
    overflow-y: hidden;
/* height: 27px; */
div{
    line-height: 14px;
    padding-top: 3px;
    padding-left: 5px;
    padding-bottom: 3px;
   
}
}
`
export const MenuWrapper = styled.div`
  position: relative;
`;
export const MenuList = styled.ul`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: orange;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transition: opacity 0.2s ease-in-out;
`;
export const MenuItem = styled.li`
  list-style-type: none;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
export const CustomTableWrapper = styled.div`
  box-shadow: 0px -120px 110px inset rgba(240, 240, 240, 0.452);
  /* background-color: orange; */
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 17px;
  left: 0;
  z-index: 100;
  border: none !important;
`;
export const CustomTable = styled(DataTable)`
width: ${({width})=>width?width:''};
.p-datatable-wrapper {
  box-shadow: 0px -120px 110px inset rgba(240, 240, 240, 0.452);
  overflow-x: scroll;
  .p-datatable-table {
    .p-datatable-thead {
      tr {
        th {
          font-family: "Manrope";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          color: #b4b4b4;
          line-height: 19px;
          background: white;
          text-align: center;
          ${({theadStyles})=>theadStyles?theadStyles:''}
          .p-column-header-content {
            display: flex;
            justify-content: center;
            .p-column-filter-menu {
              margin-left: 0 !important;
              margin-right: 5px;
              button {
                background-color: transparent !important;
                outline: none;
                .pi-filter-icon {
                  color: white !important;
                }
                &:hover {
                  background-color: transparent !important;
                }
                &:focus {
                  outline: none !important;
                  box-shadow: none !important;
                }
              }
            }
          }
        }
        .p-selection-column {
          padding-left: 16px;
          .p-checkbox {
            .p-checkbox-box {
              /* background: rgba(164, 164, 164, 0.28); */
              border: 1px solid #a4a4a4;
              border-radius: 2px;
              /* width: 16px;
height: 16px; */
            }
          }
        }
      }
    }
    .p-datatable-tbody {
      tr {
        td {
          background-color: white !important;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          text-align: center;
          color: #212121;
          padding-top: 18px;
          padding-bottom: 19px;
        }
        .p-selection-column {
          padding-left: 16px;
          .p-checkbox {
            .p-checkbox-box {
              /* background: rgba(164, 164, 164, 0.28); */
              border: 1px solid #a4a4a4;
              border-radius: 2px;
            }
          }
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 5px !important;
    background: white !important;
    height: 10px !important;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 30px !important;
    background-color: #a4a4a4 !important;
  }
}
`;