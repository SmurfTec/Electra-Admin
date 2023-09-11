import { useState, useEffect } from 'react';
import {
  getProductById,
  GetAllProducts,
  getAllProductRequest,
} from '../store/Slices/ProductSlice';
export const useGetProducts = (props?: any) => {
  const [productsAdded, setProductAdded] = useState<any>(null);
  const [prodLoading, setProdLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllProducts(props);
        setProductAdded(response);
        setProdLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [props]);

  return { productsAdded, prodLoading };
};

export const useProductDetail = (id: any) => {
  const [ProductData, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(id);
        console.log(response);
        setData(response);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return { ProductData, loading };
};

export const useAllProductRequests = (
  load?: any,
  setLoading?: any,
  initialPageData?: any,
) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProductRequest(initialPageData);
        setData(response);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [load, initialPageData]);

  return data;
};
