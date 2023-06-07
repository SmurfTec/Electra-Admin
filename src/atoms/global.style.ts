import styled from "styled-components";
import { Menu } from "primereact/menu";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { TabView } from 'primereact/tabview';
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';

export const CustomInputCalendar=styled(Calendar)`
overflow: hidden !important;
.p-inputtext{
  border: black !important;
}
.p-button{
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;

  
}
`
// type DialogProps = {
//   visible?: boolean;
//   modal?: boolean;
//   position?: string;
//   draggable?: boolean;
//   resizable?: boolean;
//   minWidth?: number;
//   minHeight?: number;
//   width?: any;
//   height?: any;
//   contentStyle?: object;
//   contentClassName?: string;
//   closeOnEscape?: boolean;
//   dismissableMask?: boolean;
//   showHeader?: boolean;
//   header?: React.ReactNode;
//   icons?: React.ReactNode;
//   closable?: boolean;
//   closeIcon?: string;
//   appendTo?: HTMLElement | null;
//   baseZIndex?: number;
//   maximizable?: boolean;
//   blockScroll?: boolean;
//   ariaCloseIconLabel?: string;
//   focusOnShow?: boolean;
//   breakpoints?: object;
//   onShow?(): void;
//   onHide?(result: any): void;
//   onMaximize?(event: React.MouseEvent<HTMLElement>): void;
//   onMinimize?(event: React.MouseEvent<HTMLElement>): void;
//   onDragStart?(event: React.MouseEvent<HTMLElement>): void;
//   onDrag?(event: React.MouseEvent<HTMLElement>): void;
//   onDragEnd?(event: React.MouseEvent<HTMLElement>): void;
//   onResizeStart?(event: React.MouseEvent<HTMLElement>): void;
//   onResize?(event: React.MouseEvent<HTMLElement>): void;
//   onResizeEnd?(event: React.MouseEvent<HTMLElement>): void;
//   footer?: React.ReactNode;
// };
export const CustomDialog=styled(Dialog)<any>`
position: relative;
border-radius: ${({ rounded }: any) => (rounded ? rounded : "20px")};
hr{
  margin-top:23px ;
}
.p-dialog-content{
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
  overflow: auto;
}
.dialog-header{
  padding-top: 25px;
}
.p-dialog-header{
  display: none !important;
}
.dialogbody{
  margin-left:auto ;
  margin-right: auto;
  margin-top: 32px;
}
::-webkit-scrollbar{
  display: none !important;
}
::-webkit-scrollbar-vertical {
  display: none !important;
}
::-webkit-scrollbar-horizontal {
  display: none;
}
`
export const CustomCheckBox=styled(Checkbox)`
 .p-checkbox-box.p-highlight{
  border-color:'#D9D9D9' !important
}
.p-checkbox-box{
  background: #D9D9D9 !important;
box-shadow: none !important;
border: 2px solid #D9D9D9 !important;
&:hover{
  border-color:'#D9D9D9' !important
}
}

`
export const CustomTextArea=styled(InputTextarea)`
outline: none !important;
box-shadow: none !important;

border-radius: 10px !important;
`
export const CustomTabView=styled(TabView)`


.p-tabview-nav{
  border: none;
  overflow: visible;
  &::before{
  position: absolute;
   bottom:-1px;
    transform: translateY(-100%);
    width: 98%;
    height: 3px;
    background-color: rgba(164, 164, 164, 0.17);
   
    border-radius: 10px;
    content: "";
    z-index: 100;
}
 .p-unselectable-text{

  overflow: visible;
    .p-tabview-nav-link{
      overflow: hidden !important;
      box-shadow: none !important;
      border-width: 0px !important;
      span{
        overflow: hidden !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            font-family: 'Manrope' !important;
            padding-top: 4px;
            padding-bottom: 4px;
          }
    }
 }
 .p-highlight{
border-bottom:2px solid orange !important;
position: relative;
&::before{
  position: absolute;
    top: 100%;
    transform: translateY(-100%);
    width: 100%;
    height: 3px;
    background-color: #3C82D6;
    border-radius: 10px;
    content: "";
    z-index: 100;
}
 } 
}
.p-tabview-panels{
  padding-left: 0px;
  padding-top: 10px;
}
`
type SwitchProps={
  margintop?:string
  checked?:boolean
}
export const Switch = styled(InputSwitch)<SwitchProps>`
  width: 38px;
  height: 21px;
  .p-inputswitch-slider {
    background: ${({ checked }: any) =>
      checked ? "#212121" : "#B4B4B4"} !important;
      box-shadow: none !important;
  }
  .p-inputswitch-slider:before {
    width: 10px;
    height: 10px;
    left: 3px;
    margin-top:${({margintop}:any)=>margintop}; //-6px
  }
`;
type menuprops={
  width?:string;
  height?:string
}
export const CustomMenu = styled(Menu)<menuprops>`
  width: ${({ width }: any) => (width ? width : "110px")};
  height: ${({ height }: any) => (height ? height : "108px")};
  padding: 10px;
  .p-menu-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 5px;
  }
  .p-submenu-header {
    display: none !important;
  }

  .p-menuitem {
    border-radius: 5px;
    width: 90px;
    cursor: pointer;
    overflow-y: hidden;
    /* height: 27px; */
    div {
      line-height: 14px;
      padding-top: 3px;
      padding-left: 5px;
      padding-bottom: 3px;
    }
  }
`;
export const MenuWrapper = styled.div`
  position: relative;
`;
type listprops={
  visible?:any
}
export const MenuList = styled.ul<listprops>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: orange;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  opacity: ${({ visible }: any) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }: any) => (visible ? "auto" : "none")};
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
type tableprops={
width?:string;
theadStyles?:string;
columnheader?:string;
tablebodycolor?:string
}
export const CustomTable = styled(DataTable)<tableprops>`
  width: ${({ width }: any) => (width ? width : "")};
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
            ${({ theadStyles }: any) => (theadStyles ? theadStyles : "")}
            .p-column-header-content {
              display: flex;
              justify-content: ${({ columnheader }: any) =>
                columnheader ? columnheader : "center"};
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
            background-color: ${({ tablebodycolor }:any) =>
              tablebodycolor ? tablebodycolor : `white !important`};
            font-family: "Manrope";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            text-align: center;
            color: #212121;
            padding-top: 18px;
            padding-bottom: 19px;
            position: relative;
            
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
