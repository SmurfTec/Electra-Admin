import {useState,useEffect}from "react"
import {getAllOrders} from "../store/Slices/OrderSlice"
export const useGetOrderAll = () => {
    const [orderData, setOrderData] = useState<any>(null);
    const [orderLoading, setOrderLoading] = useState<any>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllOrders({rowsPerPage:25,currentPage:1});
          setOrderData(response);
          setOrderLoading(false)
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return {orderData,orderLoading};
  };
