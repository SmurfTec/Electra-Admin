import { useState, useEffect } from 'react';
import { getAllFees } from '../store/Slices/FeesSlice';
export const useFeesAll = (body: any, initialPagination: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFees(initialPagination);
        setData(response);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [body, initialPagination]);

  return { data, loading, setLoading };
};
