import { useEffect, useState } from "react";
import { getAllVariants } from "../store/Slices/VariantSlice";
export const useVariantDetail = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllVariants();
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
