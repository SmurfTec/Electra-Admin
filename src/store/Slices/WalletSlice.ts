import url from "../../config";
export const getBalance = async () => {
  try {
    let response: any = await url.get("/wallets/balance");
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getWalletStats = async () => {
    try {
      let response: any = await url.get("/wallets/wallet-stats");
      return response.data;
    } catch (e) {
      return e;
    }
  };
export const getPayouts=async({limit=5,starting_after=""}:any)=>{
  let params= starting_after?.length>0?`/wallets/payouts/?limit=${limit}&starting_after=${starting_after}`:`/wallets/payouts/?limit=${limit}`
    try{
        let response: any = await url.get(params);
        return response.data;
    }catch(e){

    }
}
export const getPayments=async({limit=5,starting_after=""}:any)=>{
  let params= starting_after?.length>0?`/wallets/payments/?limit=${limit}&starting_after=${starting_after}`:`/wallets/payments/?limit=${limit}`
    try{
        let response: any = await url.get(params);
        return response.data;
    }catch(e){

    }
}
export const getTransfers=async({limit=5,starting_after=""}:any)=>{
  let params= starting_after?.length>0?`/wallets/transfers/?limit=${limit}&starting_after=${starting_after}`:`/wallets/transfers/?limit=${limit}`
    try{
        let response: any = await url.get(`${params}`);
        return response.data;
    }catch(e){

    }
}
