import url from "../../config";
export const getBalance = async () => {
  try {
    let response: any = await url.get("/wallets/balance");
    return response;
  } catch (e) {
    return e;
  }
};
export const getWalletStats = async () => {
    try {
      let response: any = await url.get("/wallets/wallet-stats");
      return response;
    } catch (e) {
      return e;
    }
  };
export const getPayouts=async()=>{
    try{
        let response: any = await url.get("/wallets/payouts");
        return response.data;
    }catch(e){

    }
}
export const getPayments=async()=>{
    try{
        let response: any = await url.get("/wallets/payments");
        return response.data;
    }catch(e){

    }
}
export const getTransfers=async()=>{
    try{
        let response: any = await url.get("/wallets/transfers/?limit=5&starting_after=tr_1NZYILEPDzqfAEED4voGwLo1");
        return response.data;
    }catch(e){

    }
}
