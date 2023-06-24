import { useEffect, useState } from "react";
import { getWebsite,getWebsiteById } from "../store/Slices/WebsiteSlice";
export const useGetWebsite = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWebsite();
        setData(response.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return data;

};
export const useGetWebsiteId = (id:any) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWebsiteById(id);
        setData(response.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return data;

};
