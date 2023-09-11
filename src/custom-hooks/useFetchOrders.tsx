import { useState, useEffect } from 'react';
import { getAllOrders } from '../store/Slices/OrderSlice';
import moment from 'moment';
interface OrderParams {
  rowsPerPage?: number;
  currentPage?: number;
  status?: string;
}
export const useFetchOrders = (params: OrderParams) => {
  const [orderData, setOrderData] = useState<any>(null);
  const [allorderData, setallOrderData] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState<any>(true);
  const [stats, setstats] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setOrderLoading(true);
        const response = await getAllOrders(params);
        // const response2 = await getAllOrders({params});
        console.log(response, 'response');
        if (response.orders) {
          setOrderData(response.orders);
          setOrderLoading(false);
          setstats(response.stats[0]);
          let allorderstats = response.stats[0].all_orders;
          const response2 = await getAllOrders({
            rowsPerPage: allorderstats,
            currentPage: 1,
            status: '',
          });
          if (response2.orders) {
            let neworders = response2.orders.map((item: any) => {
              let updatedObj = {
                ...item,
                id: item.id,
                Seller: item?.seller?.firstname + ' ' + item?.seller?.lastname,
                Buyer: item?.buyer?.firstname + ' ' + item?.buyer?.lastname,
                'Item Name': item?.product?.title,
                saleprice: item?.saleprice,
                trackingid: item?.trackingid,
                'Order No': item?.id,
                'Sold On': moment(item?.created_on).format('DD,MM,YYYY'),
                soldon: moment(item?.created_on).format('DD,MM,YYYY'),
                ship_in: item?.ship_in,
                status: item?.status,
              };
              return updatedObj;
            });
            setallOrderData(neworders);
          }
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return { orderData, orderLoading, stats, allorderData };
};
