import { useState, useEffect } from 'react';

import { getAllBrands } from '../store/Slices/BrandSlice';
interface BrandParams {
  rowsPerPage?: number;
  currentPage?: number;
}
export const useFetchBrands = (params: BrandParams) => {
  const [BrandData, setBrandData] = useState<any>(null);
  const [BrandLoading, setBrandLoading] = useState<any>(true);
  const [stats, setstats] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBrandLoading(true);
        const response = await getAllBrands(params);
        console.log(response);
        if (response.brands) {
          setBrandData(response.brands);
          setBrandLoading(false);
          setstats(response.count);
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return { BrandData, BrandLoading, stats };
};
