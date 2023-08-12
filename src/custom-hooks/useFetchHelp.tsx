import {useState,useEffect}from "react"
import { getAllSupport } from "../store/Slices/HelpCenterSlice";
export const useFetchHelp = (params?:any) => {
    const [helpData, sethelpData] = useState<any>(null);
    const [helpLoading, setHelpLoading] = useState<any>(false);
    const [stats,setstats]=useState(0)
    useEffect(() => {
      const fetchData = async () => {
        try {
          setHelpLoading(true)
          const response = await getAllSupport(params);
        
          if(response.supports){
            sethelpData(response.supports);
            setHelpLoading(false)
            setstats(response.count)
          }
         
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
  
      fetchData();
    }, [params]);
  
    return {helpData,helpLoading,stats};
  };
