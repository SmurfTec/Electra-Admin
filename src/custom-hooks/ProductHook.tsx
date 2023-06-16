import  { useState, useEffect } from 'react';
import { getProductById } from '../store/Slices/ProductSlice';

export const useProductDetail = (id: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await getProductById(id);
        setData(response);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return data;
};