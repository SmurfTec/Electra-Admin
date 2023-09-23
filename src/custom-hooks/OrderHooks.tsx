import { useState, useEffect } from 'react';
import { getAllOrders } from '../store/Slices/OrderSlice';
export const useGetOrderAll = (params?: any) => {
  const [orderData, setOrderData] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOrders(params);

        setOrderData(response);
        setOrderLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { orderData, orderLoading };
};
