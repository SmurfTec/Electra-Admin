import React, { useEffect } from 'react';
import { getDashboardData } from '../store/Slices/DashSlice';
import { getAllBestSellingProduct } from '../store/Slices/ProductSlice';
export const useGetDashStats = () => {
  const [dashStats, setDashStats] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const fetchDashStats = async () => {
    const DATA = await getDashboardData();
    setDashStats(DATA);
    setLoading(false);
  };
  useEffect(() => {
    fetchDashStats();
  }, []);
  return { dashStats, loading };
};

export const useGetBestSelling = (params?: any) => {
  const [bestSelling, setBestSelling] = React.useState();
  const [bestLoading, setBestLoading] = React.useState(true);
  const fetchDashStats = async () => {
    try {
      const DATA = await getAllBestSellingProduct(params);
      setBestSelling(DATA);
      setBestLoading(false);
    } catch (er) {
      console.log('er', er);
    }
  };
  useEffect(() => {
    fetchDashStats();
  }, [params]);
  return { bestSelling, bestLoading };
};
