import {useState,useEffect} from "react"
import {
    getAllListings
} from  "../store/Slices/ListingsSlice";

export const useListingDetail = () => {
    const [data, setData] = useState<any>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllListings();
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