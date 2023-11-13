import moment from 'moment';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomTableComponent } from '../../../atoms';
import { CustomMenu } from '../../../atoms/global.style';
import { Header, Paginatior, SuccessModel } from '../../../components';
import { SVGIcon } from '../../../components/SVG';
import { useFetchHelp } from '../../../custom-hooks/useFetchHelp';
import { DeleteSupport } from '../../../store/Slices/HelpCenterSlice';

export const HelpCenter = () => {
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [LoadMore, setLoadMore] = useState(false);
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 8,
    currentPage: 1,
  });
  const { helpData, helpLoading, stats } = useFetchHelp(initialPageData);
  const deleteItem = async (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
    try {
      const r = await DeleteSupport(id);
      setvisible(true);
      setInitialPageData({ ...initialPageData, currentPage: 1 });
    } catch (err) {}
  };
  const ViewItem = (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
    navigate(`/HelpCenterDetail/${id}`);
  };

  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({
      id,
      menuRef,
    }: {
      id: string;
      menuRef: React.RefObject<any>;
    }) => {
      const [items] = useState([
        {
          label: 'View Item',

          template: (item: any) => {
            return (
              <div
                onClick={event => ViewItem(event, rowData.id)}
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Ban} /> View Item
              </div>
            );
          },
        },
        {
          label: 'Delete',
          template: (item: MenuItem) => {
            return (
              <div
                onClick={event => deleteItem(event, rowData.id)}
                style={{ background: 'rgba(231, 29, 54, 0.05)' }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ]);

      return (
        <CustomMenu
          model={items}
          popup
          height={'80px'}
          ref={menuRef}
          id="popup_menu_left"
        />
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
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />
          <MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };
  const OrderBodyTemplate = (options: any) => {
    return (
      <>
        <p className="text-[14px] font-[600] text-blue">{options.order}</p>
      </>
    );
  };
  const CategoryBodyTemplate = (options: any) => {
    return (
      <>
        <p className="text-[14px] font-[600] text-blue">{options.category}</p>
      </>
    );
  };
  const StatusBodyTemplate = (options: any) => {
    return (
      <>
        <p
          className={`text-[14px] font-[600] p-2 rounded-[22px] text-white ${
            options.status == 'resolved' ? 'bg-blue' : 'bg-black'
          }`}
        >
          {options.status}
        </p>
      </>
    );
  };
  const [columnData] = useState([
    { field: 'id', header: 'ID' },
    { field: 'firstname', header: 'First Name' },
    { field: 'lastname', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'order', header: 'Order No', body: OrderBodyTemplate },
    { field: 'category', header: 'Category', body: CategoryBodyTemplate },
    { field: 'created_on', header: 'Date' },
    { field: 'status', header: 'Status', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ]);

  useEffect(() => {
    const newArr = helpData?.map((item: any) => {
      const newObj = {
        ...item,
        created_on: moment(item.created_on).format('DD,MM,YYYY'),
      };
      return newObj;
    });
    setFilterData(newArr);
  }, [helpData]);
  return (
    <div>
      <SuccessModel
        visible={visible}
        setVisible={setvisible}
        txt="Deleted Successfully"
      />
      <Header typeSearch={true} UserBox={true} />
      {!helpLoading ? (
        <>
          <div>
            <CustomTableComponent
              showWrapper={false}
              filterData={filterData}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              columnData={columnData}
              MultipleSelect={true}
              LoadMore={LoadMore}
              setLoadMore={setLoadMore}
            />
          </div>
          <Paginatior
            totalRecords={Number(stats)}
            initialPageData={initialPageData}
            setInitialPageData={setInitialPageData}
            recordShowing={Math.min(
              initialPageData.currentPage * initialPageData.rowsPerPage,
              Number(stats)
            )}
          />
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: 'hidden' }} />
        </div>
      )}
    </div>
  );
};
