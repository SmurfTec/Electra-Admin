import {useState,useEffect}from "react"
import { getAllCoupons } from "../store/Slices/Coupons";
interface CouponsParams{
    rowsPerPage?: number,
    currentPage?: number,
}
export const useFetchCoupon = (params:CouponsParams) => {
    const [couponData, setcouponData] = useState<any>(null);
    const [couponLoading, setcouponLoading] = useState<any>(true);
    const[stats,setstats]=useState<any>();
    useEffect(() => {
      const fetchData = async () => {
        try {
            setcouponLoading(true)
          const response = await getAllCoupons(params);
          
        if(response.coupons){
            setcouponData(response.coupons);
            setcouponLoading(false)
            setstats(response.stats[0])
        
        }
          
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
 
      fetchData();
    }, [params]);
  
    return {couponData,couponLoading,stats};
  };