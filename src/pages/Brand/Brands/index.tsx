import React, { useEffect, useRef, useState } from 'react';
import {
  Confirmationmodal,
  CreateCouponModel,
  DashCard,
  Header,
  SuccessModel,
} from '../../../components';

import moment from 'moment';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomTableComponent } from '../../../atoms';
import { CustomMenu } from '../../../atoms/global.style';
import { Paginatior } from '../../../components';
import { SVGIcon } from '../../../components/SVG';
import { BaseURL } from '../../../config';
import { useFetchBrands } from '../../../custom-hooks/useFetchBrands';
import { DeleteBrand } from '../../../store/Slices/BrandSlice';
export const Brands = () => {
  const [filterData, setfilterData] = useState([]);
  const navigate = useNavigate();
  const [added, setadded] = useState(false);

  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 8,
    currentPage: 1,
  });
  const [visible, setvisible] = useState(false);
  const { BrandData, BrandLoading, stats } = useFetchBrands(initialPageData);

  const [currentId, setcurrentId] = useState();
  useEffect(() => {
    if (BrandData) {
      const latestArr = BrandData.map((item: any) => {
        const newObj = {
          ...item,
          brandimage: BaseURL + item?.image?.filename,
          CreatedOn: moment(item.created_on).format('DD,MMM,YYYY'),
        };
        return newObj;
      });

      latestArr.sort((a: any, b: any) => a.id - b.id);
      setfilterData(latestArr);
    }
  }, [BrandData]);

  const [successVisible, setsuccessVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);

  const deleteItem = async (event: React.MouseEvent, id: any) => {
    event.stopPropagation();

    setcurrentId(id);
    setvisible(true);
  };
  const setOkButton = async () => {
    try {
      const response = await DeleteBrand(currentId);

      setsuccessVisible(true);
      setvisible(false);
      setInitialPageData({ ...initialPageData, currentPage: 1 });
    } catch (err) {}
  };
  const EditItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();

    navigate(`/EditBrand/${item}`);
  };
  const MenuBodyTemplate = (rowData: any) => {
    const menuLeftRef = useRef<any>(null);
    const handleClick = (event: any) => {
      event.preventDefault();
      menuLeftRef.current?.toggle(event);
    };
    const MenuTemplate = ({
      id,
      menuRef,
    }: {
      id: string;
      menuRef: React.RefObject<any>;
    }) => {
      const [items] = useState([
        {
          label: 'Edit Item',

          template: (item: any) => {
            return (
              <div
                onClick={event => EditItem(event, rowData.id)}
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Pencil} /> Edit Item
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

    return (
      <>
        <div
          className={` px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />
          <MenuTemplate id={rowData} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };

  const TitleBody = (option: any) => {
    return (
      <p className="flex gap-2 justify-start items-center">
        <img
          className="w-[28px] h-[28px] rounded-[6px]"
          src={option['brandimage']}
        />
        <span className="">{option['title']}</span>
      </p>
    );
  };
  const [columnData] = useState([
    { field: 'id', header: 'ID' },
    {
      field: 'title',
      header: 'Title',
      body: TitleBody,
      className: '!w-[8rem]',
    },
    { field: 'products_count', header: 'Products' },

    { field: 'CreatedOn', header: 'Created On' },

    { field: '', header: '', body: MenuBodyTemplate },
  ]);

  useEffect(() => {
    if (added) {
      setadded(false);
      setInitialPageData({ ...initialPageData, currentPage: 1 });
    }
  }, [added]);
  return (
    <div>
      <Confirmationmodal
        PopupHeader={'Confirmation'}
        visible={visible}
        setVisible={setvisible}
        cnfrmbtnText={'Delete'}
        cnfrmbtnStyle={'bg-red'}
        cnclebtnText={'Cancel'}
        text={'Are you sure you want to Delete this brand'}
        setOkButton={setOkButton}
        setCancelButton={() => {
          setvisible(true);
        }}
      />
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt={'Brand deleted Successfully'}
      />
      <Header typeSearch={true} UserBox={true} />
      {!BrandLoading ? (
        <>
          <div className="mt-[35px]">
            <div className="flex flex-wrap gap-6 mt-[28px]">
              <DashCard
                title={'Total Brands'}
                titleStyle={`!text-[13px]`}
                totalNumber={String(stats)}
                showDefaultNumber={false}
                Numberstyle={`!text-[28px]`}
              />
              <DashCard
                Add={true}
                txt="Add New Brand"
                outerclasses="w-[284px] h-[140px]"
                Addimg={IMAGES.AddItem}
                onClick={() => {
                  navigate('/CreateBrand');
                }}
              />
            </div>
          </div>
          <div className="mt-[20px] w-[98%]">
            <CustomTableComponent
              theadStyles={{ background: '#FCFCFC' }}
              width="98%"
              showWrapper={false}
              filterData={filterData}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              columnData={columnData}
              MultipleSelect={true}
            />
            <Paginatior
              totalRecords={Number(stats)}
              initialPageData={initialPageData}
              setInitialPageData={setInitialPageData}
              recordShowing={Math.min(
                initialPageData.currentPage * initialPageData.rowsPerPage,
                Number(stats)
              )}
              // recordShowing={filterData.length}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: 'hidden' }} />
        </div>
      )}
    </div>
  );
};
