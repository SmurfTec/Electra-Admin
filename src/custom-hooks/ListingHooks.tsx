import {useState,useEffect} from "react"
import {
    getAllListings,getListingById
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

export const useListingById=(id:any)=>{
  const [data,setData]=useState<any>();
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await getListingById(id);
        setData(response.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  },[])
  return data;
}