import moment from 'moment';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images.js';
import { CustomMenu } from '../../../atoms/global.style';
import { CustomSwitch, CustomTableComponent } from '../../../atoms/index.js';
import { SVGIcon } from '../../../components/SVG/index.js';
import { DashCard, Header, Paginatior } from '../../../components/index.js';
import {
  EditProductAPI,
  GetAllProducts,
  UpdateStatusAPI,
  setProductCount,
} from '../../../store/Slices/ProductSlice.js';

import { Button } from 'primereact/button';

export const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState([]);
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const [totalProducts, setTotalProducts] = useState();
  const [stats, setStats] = useState<any>();
  const getProducts = async () => {
    try {
      const response = await GetAllProducts(initialPageData);
      setTotalProducts(response.stats.total_products);
      dispatch(setProductCount(response.stats.total_products));
      setStats(response.stats);
      const latestArray = response.products.map((item: any, index: number) => {
        const newObj = {
          ...item,
          category: item.category.name,
          Brand: item.brand.title,
          listing: item.product_properties.listings,
          addedon: moment(item.created_on).format('DD,MMM,YYYY'),
          availibility: item.is_active ? 'Active' : 'InActive',
        };
        return newObj;
      });
      setFilterData(latestArray);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, [initialPageData]);
  const [MenuLabel, setMenuLabel] = useState('');
  const menuLeft: any = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [LoadMore, setLoadMore] = useState(true);
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState({});

  const SwitchTemplate = (option: any) => {
    let dataOption = option.is_active ? true : false;

    const Edit = async (value: any) => {
      setLoading(true);
      const add = await UpdateStatusAPI({ is_active: value }, option.id);
      const get = await getProducts();
      setLoading(false);
    };

    return (
      <>
        <CustomSwitch
          onChange={(e: any) => {
            dataOption = !dataOption;
            Edit(!e);
          }}
          value={dataOption}
          checked={dataOption}
          // setChecked={setChecked}
        />
      </>
    );
  };
  3;
  const viewItem = (event: React.MouseEvent, item: any, vaaluue?: any) => {
    event.stopPropagation();

    setMenuLabel(prevLabel => (prevLabel === item.label ? '' : item.label));
  };

  const items = [
    {
      label: 'View',
      template: (item: MenuItem) => {
        return (
          <div
            onClick={(event: any) => viewItem(event, item, CurrSelectedProduct)}
            style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
            className="flex gap-1 items-center  text-[16px] font-[400] text-[#21212]"
          >
            <SVGIcon
              width="11px"
              height="8px"
              fillcolor={'#212121'}
              src={IMAGES.eye}
            />{' '}
            View
          </div>
        );
      },
    },
  ];
  const MenuBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setCurrSelectedProduct(rowData.id);
      menuLeft.current.toggle(event);
    };
    useEffect(() => {
      if (initial) {
        setInitial(false);
      } else {
        // console.log(
        //   'Menu',
        //   MenuLabel,
        //   'product',
        //   selectedProducts,
        //   'CurrSelectedProduct',
        //   CurrSelectedProduct
        // );
      }
    }, [MenuLabel, CurrSelectedProduct]);
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          {/* <Button
            icon='pi pi-ellipsis-h'
            rounded
            text
            aria-label='Filter'
            className='bg-[#fff] hover:bg-[#f8f8f8] '
          /> */}

          <Button
            icon="pi pi-ellipsis-h"
            rounded
            text
            severity="secondary"
            aria-label="Action"
            className="font-extrabold text-black"
            onClick={handleClick}
          />
          {/* <SVGIcon onClick={handleClick} src={IMAGES.Dots} /> */}
          <CustomMenu
            model={items}
            height={'auto'}
            popup
            ref={menuLeft}
            id="popup_menu_left"
          />
        </div>
      </>
    );
  };
  const [columnData] = useState([
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Title' },
    { field: 'category', header: 'Category' },
    { field: 'Brand', header: 'Brand' },
    { field: 'addedon', header: 'Added On' },
    { field: 'listing', header: 'Listing' },
    { field: 'availibility', header: 'Availibility', body: SwitchTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ]);
  useEffect(() => {
    if (MenuLabel == 'View') {
      navigate(`/ProductDetail/${CurrSelectedProduct}`);
    } else {
      // console.log(
      //   'Menu',
      //   MenuLabel,
      //   'product',
      //   selectedProducts,
      //   'CurrSelectedProduct',
      //   CurrSelectedProduct
      // );
    }
  }, [MenuLabel]);
  return (
    <div>
      <Header typeSearch={true} UserBox={true} />
      {!loading ? (
        <>
          {' '}
          <div className="flex flex-wrap gap-6 mt-[28px]">
            <DashCard
              title={'Total Products'}
              totalNumber={stats?.total_products}
              myImg={IMAGES.ProductBox}
              imgColor={'bg-yellow-dash'}
              textDash={' !w-full '}
              textColor={'#3C82D6'}
              // txt="Last Updated 24,aug,2020"
              outerclasses="w-[284px] h-[140px]"
            />
            <DashCard
              title={'Product Sold in last month'}
              totalNumber={stats?.total_products_sold_last_month}
              myImg={IMAGES.ProductBox}
              imgColor={'bg-yellow-dash'}
              textDash={
                stats?.products_percentage < 0
                  ? 'bg-custom-red !w-[80px]'
                  : 'bg-custom-blue !w-[80px]'
              }
              textColor={stats?.products_percentage < 0 ? '#FF0000' : '#3C82D6'}
              arrowImg={
                stats?.products_percentage < 0
                  ? IMAGES.downarrow
                  : IMAGES.uparrow
              }
              percentageTxt={`% ${
                stats?.products_percentage?.toFixed(1) ?? '0'
              }`}
              outerclasses="w-[284px] h-[140px]"
            />
            <DashCard
              title={'Product Sold In 6 Months'}
              totalNumber={stats?.total_products_sold_last_Six_months}
              myImg={IMAGES.ProductBox}
              imgColor={'bg-yellow-dash'}
              textDash={
                stats?.products_percentage < 0
                  ? 'bg-custom-red !w-[80px]'
                  : 'bg-custom-blue !w-[80px]'
              }
              textColor={stats?.products_percentage < 0 ? '#FF0000' : '#3C82D6'}
              arrowImg={
                stats?.products_percentage < 0
                  ? IMAGES.downarrow
                  : IMAGES.uparrow
              }
              percentageTxt={`% ${
                stats?.products_percentage?.toFixed(1) ?? '0'
              }`}
              outerclasses="w-[284px] h-[140px]"
            />
            <DashCard
              onClick={() => navigate('/AddProduct')}
              Add={true}
              txt="Add New Product"
              outerclasses="w-[284px] h-[140px]"
              txtclasses={'text-[#212121]'}
              Addimg={IMAGES.AddItem}
            />
          </div>
          <div className="mt-[40px] relative">
            <CustomTableComponent
              filterData={filterData}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              columnData={columnData}
              // MultipleSelect={true}
              LoadMore={LoadMore}
              setLoadMore={setLoadMore}
              // pagination={true}
            />
            <Paginatior
              totalRecords={Number(totalProducts)}
              initialPageData={initialPageData}
              setInitialPageData={setInitialPageData}
              recordShowing={filterData?.length}
            />
          </div>
        </>
      ) : (
        <div className="w-full  flex justify-start  h-[800px] items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: 'hidden' }} />
        </div>
      )}
    </div>
  );
};
