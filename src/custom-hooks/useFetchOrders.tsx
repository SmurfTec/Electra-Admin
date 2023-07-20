import {useState,useEffect}from "react"
import {getAllOrders} from "../store/Slices/OrderSlice"
interface OrderParams{
    rowsPerPage?: number,
    currentPage?: number,
    status?:string,
}
export const useFetchOrders = (params:OrderParams) => {
    const [orderData, setOrderData] = useState<any>(null);
    const [orderLoading, setOrderLoading] = useState<any>(true);
    const[stats,setstats]=useState<any>();
    useEffect(() => {
      const fetchData = async () => {
        try {
            setOrderLoading(true)
          const response = await getAllOrders(params);
          console.log(response,"response")
        if(response.orders){
            setOrderData(response.orders);
            setOrderLoading(false)
            setstats(response.stats[0])
        }
          
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
  console.log(params,"params")
      fetchData();
    }, [params]);
  
    return {orderData,orderLoading,stats};
  };