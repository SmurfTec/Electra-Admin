import url from "../../config/index";
export const getDashboardData = async () => {
  try {
    let response: any = await url.get("/stats/dashboard");
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
