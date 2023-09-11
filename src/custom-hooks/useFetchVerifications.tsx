import { useState, useEffect } from 'react';
import { getAllVerfications } from '../store/Slices/VerificationSlice';
import moment from 'moment';
interface VerificationParams {
  rowsPerPage?: number;
  currentPage?: number;
  status?: string;
  order?: number;
  trakingid?: string;
}
export const useFetchVerifications = (params: VerificationParams) => {
  const [VerificationData, setVerificationData] = useState<any>(null);
  const [allVerificationData, setallVerificationData] = useState<any>(null);
  const [VerificationLoading, setVerificationLoading] = useState<any>(true);
  const [stats, setstats] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setVerificationLoading(true);
        const response = await getAllVerfications(params);
        if (response.verifications) {
          setVerificationData(response.verifications);
          setVerificationLoading(false);
          setstats(response.stats[0]);
          let allverificationstats = response.stats[0].all;
          const response2 = await getAllVerfications({
            rowsPerPage: allverificationstats,
            currentPage: 1,
            status: '',
          });
          if (response2.verifications) {
            let neworders = response2.verifications.map((item: any) => {
              let updatedObj = {
                ...item,
                Seller: item.seller.firstname + ' ' + item.seller.lastname,
                Buyer: item.buyer.firstname + ' ' + item.buyer.lastname,
                ItemName: item.product.title,
                SalePrice: item.order.saleprice,
                TrackingID: item.order.trackingid,
                OrderNo: item.order.id,
                ActionOn: moment(item.created_on).format('DD,MM,YYYY'),
                Status: item.status,
              };
              return updatedObj;
            });
            setallVerificationData(neworders);
          }
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return { VerificationData, VerificationLoading, stats, allVerificationData };
};
