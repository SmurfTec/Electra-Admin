import React, { useEffect } from "react";
import { getDashboardData } from "../store/Slices/DashSlice";
import { getAllBestSellingProduct } from "../store/Slices/ProductSlice";
export const useGetDashStats = () => {
  const [dashStats, setDashStats] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const fetchDashStats = async () => {
    const DATA = await getDashboardData();
    console.log(DATA, "DATAAA");
    setDashStats(DATA);
    setLoading(false);
  };
  useEffect(() => {
    fetchDashStats();
  }, []);
  return { dashStats, loading };
};

export const useGetBestSelling = (params?:any) => {
  try {
    console.log(params,"PARAMS")
    const [bestSelling, setBestSelling] = React.useState();
    const [bestLoading, setBestLoading] = React.useState(true);
    const fetchDashStats = async () => {
      const DATA = await getAllBestSellingProduct(params);
      console.log(DATA, "DATAAA");
      setBestSelling(DATA);
      setBestLoading(false);
    };
    useEffect(() => {
      fetchDashStats();
    }, [params]);
    return { bestSelling, bestLoading };
  } catch (e) {
    return e
  }
};
