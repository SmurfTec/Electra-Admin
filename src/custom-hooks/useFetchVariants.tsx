import {useState,useEffect}from "react"


import { getAllVariants } from "../store/Slices/VariantSlice";
interface VariantParams{
    rowsPerPage?: number,
    currentPage?: number,
} 
export const useFetchVariants = (params:VariantParams) => {
    const [VariantData, setVariantData] = useState<any>(null);
    const [VariantLoading, setVariantLoading] = useState<any>(true);
    const[Variantstats,setstats]=useState<any>(0);
    useEffect(() => {
      const fetchData = async () => {
        try {
            setVariantLoading(true)
          const response = await getAllVariants(params);
        if(response?.variants){
            setVariantData(response.variants);
            setVariantLoading(false)
            setstats(Number(response.stats[0].all_variants   )             )
        
        }
          
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
 
      fetchData();
    }, [params]);
  
    return {VariantData,VariantLoading,Variantstats};
  };