import { useState, useEffect } from "react";
import {
  getProductById,
  GetAllProducts,
  getAllProductRequest,
} from "../store/Slices/ProductSlice";
export const useGetProducts = () => {
  const [productsAdded, setProductAdded] = useState<any>(null);
  const [prodLoading, setProdLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllProducts();
        setProductAdded(response);
        setProdLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { productsAdded, prodLoading };
};

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

export const useAllProductRequests = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProductRequest();
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
