import { useEffect, useState } from 'react';
import { getAllVariants } from '../store/Slices/VariantSlice';
export const useVariantDetail = (value: any,catg?:any) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllVariants(catg);
        setData(response);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, [value,catg]);
  return data;
};
