import {useState,useEffect}from "react"
import { getSingleUserOrder } from "../store/Slices/UserSlice";
interface OrderParams{
    rowsPerPage?: number,
    currentPage?: number,
    name?:string,
    orderid?:number,
    date?:any,
}
export const useFetchUserOrder = (id:any,active:any,initialPageData:OrderParams) => {
    const [orderData, setOrderData] = useState<any>(null);
    const [orderLoading, setOrderLoading] = useState<any>(true);
    const[stats,setstats]=useState<any>();
    useEffect(() => {
      const fetchData = async () => {
        try {
            setOrderLoading(true)
          const response = await getSingleUserOrder(id,active,initialPageData);
          
        if(response.orders){
            setOrderData(response.orders);
            setOrderLoading(false)
            setstats({...response.orderStats,total:50})
        
        }
          
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
 
      fetchData();
    }, [initialPageData,active]);
  
    return {orderData,orderLoading,stats};
  };