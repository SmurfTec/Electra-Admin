import {useState,useEffect} from "react"
import { getAllFees } from "../store/Slices/FeesSlice";
export const useFeesAll = () => {
    const [data, setData] = useState<any>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllFees();
          setData(response);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return data;
  };
