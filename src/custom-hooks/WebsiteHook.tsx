import { useEffect, useState } from "react";
import { getWebsite, getWebsiteById } from "../store/Slices/WebsiteSlice";
import {
  getNoticeBanner,
  deleteNoticeBanner,
} from "../store/Slices/WebsiteSlice";
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
export const useGetWebsiteId = (id: any) => {
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

export const useGetNoticBanner = () => {
  try {
    const [data, setData] = useState<any>();
    const [bannerLoading, setBannerLoading] = useState<any>(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getNoticeBanner();
          setData(response);
          setBannerLoading(false);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
      fetchData();
    }, [bannerLoading]);
    const deleteBanner = async (id: any) => {
      try {
        setBannerLoading(true)
        const response = await deleteNoticeBanner(id);
        if(response){
          setBannerLoading(false)
        }
      } catch (e) {
        return e
      }
    };
    return { data, bannerLoading,deleteBanner };
  } catch (e) {}
};
