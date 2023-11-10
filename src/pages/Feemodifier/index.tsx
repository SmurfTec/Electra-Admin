import moment from 'moment';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useState } from 'react';
import IMAGES from '../../assets/Images';
import { CustomTableComponent } from '../../atoms';
import { CustomMenu } from '../../atoms/global.style';
import {
  Confirmationmodal,
  DashCard,
  Feemodifcard,
  Header,
  Paginatior,
} from '../../components';
import { AddFeeModal } from '../../components/Models/AddFeeModal';
import { SVGIcon } from '../../components/SVG';
import { useFeesAll } from '../../custom-hooks/feeshooks';
import { getCategories } from '../../store/Slices/Categories';
import { UpdateFees, deleteFees } from '../../store/Slices/FeesSlice';
export const Feemodifier = () => {
  const [visible, setVisible] = React.useState(false);
  const [feesModif, setFeesModif] = useState<any>();
  const [nonCatFeeMod, setNonCatFeeMod] = useState<any>([]);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const { data, loading, setLoading } = useFeesAll(feesModif, initialPageData);
  const [currSelected, setCurrSelectedProduct] = useState<any>(null);
  const [feeValue, setFeeValue] = useState(0);

  const [addFeeDialog, setAddFeeDialog] = useState(false);
  const [categoryList, setCategoryList] = useState({
    fetching: true,
    categories: [],
  });

  useEffect(() => {
    const nonCatFees: any[] = [];
    const catFees: any[] = [];

    data?.fees.forEach((obj: any) => {
      if (obj.category.id === null) {
        console.log('obj', obj);
        nonCatFees.push({
          ID: obj.id,
          CatId: null,
          Category: '',
          'Marketplace Fee':
            obj.value_type === 'percentage' ? `${obj.fees}%` : `$${obj.fees}`,
          'Last Changed On': moment(obj.updated_on).format('DD MMM, YYYY'),
          Action: 'Edit',
          type: obj.type,
          value_type: obj.value_type,
        });
      } else
        catFees.push({
          ID: obj.id,
          CatId: obj.category.id,
          Category: obj.category.name,
          'Marketplace Fee':
            obj.value_type === 'percentage' ? `${obj.fees}%` : `$${obj.fees}`,
          'Last Changed On': moment(obj.updated_on).format('DD MMM, YYYY'),
          Action: 'Edit',
          type: obj.type,
          value_type: obj.value_type,
        });
    });

    setFeesModif(catFees);
    setNonCatFeeMod(nonCatFees);
  }, [loading]);
  useEffect(() => {
    setLoading(true);
  }, [initialPageData]);

  useEffect(() => {
    if (!categoryList.fetching) return;
    (async () => {
      try {
        let dataCat = await getCategories();
        dataCat = dataCat.categories.map((item: any, index: any) => {
          const newObj = {
            value: item.id,
            label: item.name,
          };
          return newObj;
        });
        setCategoryList({ fetching: false, categories: dataCat });
      } catch (er) {
        setCategoryList({ fetching: false, categories: [] });
      }
    })();
  }, [categoryList.fetching]);

  const deleteFeeModif = async (event: React.MouseEvent, id: any) => {
    event.stopPropagation();

    try {
      const response = await deleteFees(id);
      setInitialPageData({ ...initialPageData, currentPage: 1 });
    } catch (err) {
      console.log('err', err);
    }
  };

  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({ menuRef }: { menuRef: React.RefObject<any> }) => {
      const [items] = useState([
        {
          label: 'Delete',
          template: () => {
            return (
              <>
                <div
                  onClick={(event: any) => deleteFeeModif(event, rowData.ID)}
                  style={{ backgroundColor: 'rgba(231, 29, 54, 0.05)' }}
                  className="flex gap-2 items-center  text-[14px] font-[500] text-[#E71D36]"
                >
                  <SVGIcon
                    width="12px"
                    height="15px"
                    fillcolor={'#E71D36'}
                    src={IMAGES.Delete}
                  />{' '}
                  Delete
                </div>
              </>
            );
          },
        },
      ]);

      return (
        <CustomMenu
          height={'auto'}
          model={items}
          popup
          ref={menuRef}
          id="popup_menu_left"
        />
      );
    };
    const menuLeft: any = React.useRef(null);

    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <Button
            icon="pi pi-ellipsis-h"
            rounded
            text
            severity="secondary"
            aria-label="Action"
            className="font-extrabold text-black"
            onClick={(event: any) => {
              event.preventDefault();
              menuLeft.current.toggle(event);
            }}
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
      setCurrSelectedProduct(rowData);
      handleFeeModifierModal();
      // menuLeft.current.toggle(event);
      // setVisible(!visible);
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
    { field: 'type', header: 'Modifier Title' },
    { field: 'Category', header: 'Category' },
    { field: 'Marketplace Fee', header: 'Marketplace Fee' },
    { field: 'Last Changed On', header: 'Last Changed On' },
    { field: 'Action', header: 'Action', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ];
  const handleFunction = async (value?: any) => {
    try {
      const newData = {
        type: currSelected.type,
        fees: Number(feeValue),
      };
      const addFees = await UpdateFees(currSelected.ID, newData);
      setFeesModif('');
      setVisible(!visible);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFeeModifierModal = () => setAddFeeDialog(st => !st);
  const handleAddToTable = (fee: any, isEdit = false) => {
    console.log('fee', fee);
    const getCatname = categoryList.categories.filter(
      (el: any) => el.value === fee.category
    )[0];

    console.log('getCatname', getCatname);

    if (!isEdit) {
      console.log('fee', fee);
      if (fee.category)
        feesModif.unshift({
          ID: fee.id,
          Category: (
            categoryList.categories.filter(
              (el: any) => el.value === fee.category
            )[0] as any
          ).label,
          'Marketplace Fee':
            fee.value_type === 'percentage'
              ? `${fee.fees.toFixed(1)}%`
              : `$${fee.fees}`,
          'Last Changed On': moment(fee.updated_on).format('DD MMM, YYYY'),
          Action: 'Edit',
          type: fee.type,
        });
      else
        nonCatFeeMod.unshift({
          ID: fee.id,
          Category: null,
          'Marketplace Fee':
            fee.value_type === 'percentage'
              ? `${fee.fees.toFixed(1)}%`
              : `$${fee.fees}`,
          'Last Changed On': moment(fee.updated_on).format('DD MMM, YYYY'),
          Action: 'Edit',
          type: fee.type,
        });
    } else {
      if (fee.category) {
        if (currSelected.ID === fee.id)
          setNonCatFeeMod([nonCatFeeMod.filter((el: any) => el.ID !== fee.id)]);

        const catFees = feesModif.map((el: any) =>
          el.ID === fee.id
            ? {
                ...el,
                Category: (
                  categoryList.categories.filter(
                    (el: any) => el.value === fee.category
                  )[0] as any
                ).label,
                'Marketplace Fee':
                  fee.value_type === 'percentage'
                    ? `${fee.fees.toFixed(1)}%`
                    : `$${fee.fees}`,
                'Last Changed On': moment(fee.updated_on).format(
                  'DD MMM, YYYY'
                ),
                type: fee.type,
              }
            : el
        );
        setFeesModif([...catFees]);
      } else {
        const fees = nonCatFeeMod.map((el: any) =>
          el.ID === fee.id
            ? {
                ...el,
                Category: null,
                'Marketplace Fee':
                  fee.value_type === 'percentage'
                    ? `${fee.fees.toFixed(1)}%`
                    : `$${fee.fees}`,
                'Last Changed On': moment(fee.updated_on).format(
                  'DD MMM, YYYY'
                ),
                type: fee.type,
              }
            : el
        );
        setNonCatFeeMod([...fees]);
      }
      setCurrSelectedProduct(null);
    }
    handleFeeModifierModal();
  };

  return (
    <div>
      <Header typeSearch={true} UserBox={true} />
      <div className="w-full overflow-x-auto">
        <p className="font-bold text-[20px] ml-3">
          Modify or change platform charges, Shipping Charges and othe frees.
        </p>
        <div className="w-full ml-3 flex gap-3 overflow-x-auto">
          <DashCard
            onClick={handleFeeModifierModal}
            Addimg={IMAGES.AddItem}
            Add={true}
            txt="Add New Fee"
            outerclasses={
              'w-fit min-w-[160px] !h-[93px]  border border-custom rounded-[7px] my-3 '
            }
          />
          {nonCatFeeMod.length > 0 &&
            nonCatFeeMod.map((el: any, ind) => (
              <Feemodifcard
                key={ind}
                onClick={() => {
                  setCurrSelectedProduct(el);
                  handleFeeModifierModal();
                }}
                // onClick={() => setVisible(true)}
                title={el.type}
                number={el['Marketplace Fee']}
              />
            ))}
          {nonCatFeeMod.length > 0 &&
            nonCatFeeMod.map((el: any, ind) => (
              <Feemodifcard
                key={ind}
                onClick={() => {
                  console.log('first');
                }}
                // onClick={() => setVisible(true)}
                title={el.type}
                number={el['Marketplace Fee']}
              />
            ))}
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
      {addFeeDialog && (
        <AddFeeModal
          visible={addFeeDialog}
          toggleVisible={handleFeeModifierModal}
          categories={categoryList.categories}
          afterOperSuccess={handleAddToTable}
          isEdit={currSelected ? true : false}
          initialState={
            currSelected && {
              id: currSelected.ID,
              fees:
                currSelected.value_type === 'percentage'
                  ? +currSelected['Marketplace Fee'].split('%')[0]
                  : +currSelected['Marketplace Fee'].split('$')[1],
              value_type:
                currSelected.value_type === 'percentage' ? true : false,
              category: currSelected.CatId,
              type: currSelected.type,
            }
          }
        />
      )}
    </div>
  );
};

// const makeFeeObj = obj => {
//   return {};
// };
