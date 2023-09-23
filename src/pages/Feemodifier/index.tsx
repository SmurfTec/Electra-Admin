import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SVGIcon } from '../../components/SVG';
import { CustomTableComponent } from '../../atoms';
import { CustomMenu } from '../../atoms/global.style';
import IMAGES from '../../assets/Images';
import { Header, Feemodifcard, Confirmationmodal } from '../../components';
import { useFeesAll } from '../../custom-hooks/feeshooks';
import { CreateFees } from '../../store/Slices/FeesSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import {deleteFees} from "../../store/Slices/FeesSlice"
import { Paginatior } from '../../components';
import moment from 'moment';
export const Feemodifier = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [feesModif, setFeesModif] = useState<any>();
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const { data, loading, setLoading } = useFeesAll(feesModif, initialPageData);
  const [currSelected, setCurrSelectedProduct] = useState<any>();
  const [feeValue, setFeeValue] = useState(0);
  useEffect(() => {
    let newData = data?.fees?.map((item: any, index: any) => {
     return {
        ID: item.id,
        Category: item.category.name,
        'Marketplace Fee': item.fees + '%',
        'Last Changed On': moment(item.updated_on).format('DD MMM, YYYY'),
        Action: 'Edit',
        type: item.type,
      };
    });
    setFeesModif(newData);
  }, [loading]);
  useEffect(() => {
    setLoading(true);
  }, [initialPageData]);
  const deleteFeeModif = async (event: React.MouseEvent, id: any) => {
    event.stopPropagation();

    try {
      let response = await deleteFees(id);
      console.log(response)
      setInitialPageData({ ...initialPageData, currentPage: 1 });
    } catch (err) {}
  };
 
  const AccountBodyTemplate = (option: any) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <p className="font-bold">{option.Role}</p>
      </div>
    );
  };
  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({
      id,
      menuRef,
    }: {
      id: string;
      menuRef: React.RefObject<any>;
    }) => {
        let [items] = useState([
        {
          label: 'Delete',
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(231, 29, 54, 0.05)' }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
                onClick={(event: any) => deleteFeeModif(event, rowData.ID)}
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ]);

      return (
        <CustomMenu model={items} popup ref={menuRef} id="popup_menu_left" />
      );
    };
  const menuLeft: any = React.useRef(null);

    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon
            onClick={(event: any) => {
              event.preventDefault();
              menuLeft.current.toggle(event);
            }}
            src={IMAGES.Dots}
          />
          <MenuTemplate id={rowData.ID} menuRef={menuLeft} />
          {/* <CustomMenu  model={items} popup ref={menuLeft} id="popup_menu_left" /> */}
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      console.log(rowData);
      setCurrSelectedProduct(rowData);
      // menuLeft.current.toggle(event);
      setVisible(!visible);
    };
    return (
      <>
        <div
          onClick={handleClick}
          className="bg-[#212121] w-[83px] h-[29px]
            mx-auto
            rounded
            flex
            justify-center
            overflow-hidden
            cursor-pointer
            items-center
            gap-1
            "
        >
          <img src={IMAGES.Editpen} />
          <p className="font-bold text-[white] ">{rowData.Action}</p>
          <img src={IMAGES.dropdown} />
        </div>
      </>
    );
  };
  const columnData = [
    { field: 'ID', header: 'ID' },
    { field: 'Category', header: 'Category' },
    { field: 'Marketplace Fee', header: 'Marketplace Fee' },
    { field: 'Last Changed On', header: 'Last Changed On' },
    { field: 'Action', header: 'Action', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ];
  const handleFunction = async (value?: any) => {
    try {
      let newData = {
        type: currSelected.type,
        fees: Number(feeValue),
      };
      let addFees = await CreateFees(currSelected.ID, newData);
      setFeesModif('');
      setVisible(!visible);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Header typeSearch={true} UserBox={true} />
      <div>
        <p className="font-bold text-[20px] ml-3">
          Modify or change platform charges, Shipping Charges and othe frees.
        </p>
        <div className="ml-3 flex gap-3">
          <Feemodifcard
            onClick={() => setVisible(true)}
            title={'SHIPPING FEE'}
            number={'15'}
          />
          <Feemodifcard title={'PROCESSING FEE'} number={'15'} />
        </div>
      </div>
      <div>
        <p className="font-semibold ml-3 text-[20px]">Market Place Fee</p>
        {!loading ? (
          <CustomTableComponent
            headerStyle={{ color: 'black' }}
            filterData={feesModif}
            columnData={columnData}
          />
        ) : (
          <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
            <ProgressSpinner style={{ overflow: 'hidden' }} />
          </div>
        )}
      </div>
      <Confirmationmodal
        classes={'!h-[339px] '}
        PopupHeader={'EDIT MARKETPLACE FEE'}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={'Update'}
        cnclebtnText={'Cancel'}
        text={
          'You are editting marketplace fee for Phones. Press update to make    changes on website.'
        }
        placeholderclasses={'text-[#3C82D6]'}
        Feemodif={true}
        setValue={setFeeValue}
        value={feeValue}
        placeholderValue={'Enter Fees'}
        handleFunction={handleFunction}
      />
      <Paginatior
        totalRecords={Number(data?.feecount)}
        initialPageData={initialPageData}
        setInitialPageData={setInitialPageData}
        recordShowing={feesModif?.length}
      />
    </div>
  );
};
