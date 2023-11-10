import { useEffect, useState } from 'react';
import { getAllUsers } from '../store/Slices/UserSlice';
import {
  getPayments,
  getPayouts,
  getTransfers,
} from '../store/Slices/WalletSlice';
interface WalletProps {
  limit?: number;
  activetab?: string;
  starting_after?: string;
}
export const useFetchWallet = (props: WalletProps) => {
  const [Walletdata, setWalletdata] = useState<any>(null);
  const [WalletLoading, setWalletLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          limit: props.limit,
          starting_after: props.starting_after,
        };

        if (props.activetab == 'payout') {
          setWalletLoading(true);
          const r = await getPayouts(params);

          if (r?.status == 200) {
            setWalletdata(r.payouts);
            setWalletLoading(false);
          }
        } else if (props.activetab == 'payment') {
          setWalletLoading(true);
          const r = await getPayments(params);

          if (r) {
            setWalletdata(r.payments);
            setWalletLoading(false);
          }
        } else {
          setWalletLoading(true);
          const r = await getTransfers(params);

          setWalletdata(r.transfers);
          setWalletLoading(false);
          if (r) {
            setWalletdata(r.transfers);
            setWalletLoading(false);
          }
        }
        // const response = await getAllUsers(params);
        // setWalletdata(response);
        // setWalletLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [props]);

  return { Walletdata, WalletLoading };
};
