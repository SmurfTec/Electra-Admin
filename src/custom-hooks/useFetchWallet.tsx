import { useState, useEffect } from 'react';
import { getAllUsers } from '../store/Slices/UserSlice';
import {
  getPayouts,
  getPayments,
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
        let params = {
          limit: props.limit,
          starting_after: props.starting_after,
        };

        if (props.activetab == 'payout') {
          setWalletLoading(true);
          let r = await getPayouts(params);
          console.log(r);
          if (r?.payouts) {
            setWalletdata(r.payouts);
            console.log(r.payouts);
            setWalletLoading(false);
          }
        } else if (props.activetab == 'payment') {
          setWalletLoading(true);
          let r = await getPayments(params);
          console.log(r);
          if (r?.payments) {
            setWalletdata(r.payments);
            setWalletLoading(false);
          }
        } else {
          setWalletLoading(true);
          let r = await getTransfers(params);
          console.log(r);
          setWalletdata(r.transfers);
          setWalletLoading(false);
          if (r?.transfers) {
            setWalletdata(r.transfers);
            console.log(r.transfers);
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
