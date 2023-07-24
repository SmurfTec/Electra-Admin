import {useState,useEffect} from "react"
import {
    getAllListings,getListingById
} from  "../store/Slices/ListingsSlice";
type param={
  rowsPerPage?:number,
  currentPage?:number
}
export const useListingDetail = (params?:param) => {
    const [data, setData] = useState<any>(null);
    const [listLoad, setListLoad] = useState<any>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllListings(params);
          setData(response);
          setListLoad(false)
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
  
      fetchData();
    }, [params]);
  
    return {data,listLoad};
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