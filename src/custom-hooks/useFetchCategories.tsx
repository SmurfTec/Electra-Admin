import { useEffect, useState } from 'react';

import { getAllCategories } from '../store/Slices/Categories';
interface CategoryParams {
  rowsPerPage?: number;
  currentPage?: number;
}
export const useFetchCategories = (params: CategoryParams) => {
  const [CategoryData, setCategoryData] = useState<any>(null);
  const [CategoryLoading, setCategoryLoading] = useState<any>(true);
  const [stats, setstats] = useState<any>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategoryLoading(true);
        const response = await getAllCategories(params);
        if (response?.categories) {
          setCategoryData(response.categories);
          setCategoryLoading(false);
          setstats(Number(response.stats[0].all_categories));
        }
      } catch (error) {
        // Handle error
        // console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return { CategoryData, CategoryLoading, stats };
};
