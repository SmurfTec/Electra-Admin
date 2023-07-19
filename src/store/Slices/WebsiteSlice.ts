import url from "../../config";
export const getWebsite = async () => {
  try {
    let response: any = await url.get("/websites");
    return response;
  } catch (e) {
    return e;
  }
};
export const getWebsiteById = async (id: any) => {
  try {
    let response: any = await url.get(`/websites/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

// SECTIONS
export const updateSeciton = async (wid: any, id: any, body: any) => {
  try {
    console.log(body, "BODy");
    let response: any = await url.put(`/sections/${id}`, body);
    if (response) {
      const getNew = await getWebsiteById(wid);
      return getNew.data;
    }
  } catch (e) {
    return e;
  }
};
// SECTIONS
export const deleteSeciton = async (id: any, body: any) => {
  try {
    console.log(body, "BODy");
    let response: any = await url.put(`/sections/${id}`, body);
    if (response) {
      const getNew = await getWebsiteById(id);
      return getNew.data;
    }
  } catch (e) {
    return e;
  }
};
export const getNoticeBanner = async () => {
  try {
    let response = await url.get("/notice_banners");
    if (response) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
};
export const getNoticeBannerById = async (id: any) => {
  try {
    let response = await url.get(`/notice_banners/${id}`);
    if (response) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
};
type noticeBanner = {
  title: string;
  color: string;
  background: string;
};
export const createNoticeBanner = async (data: noticeBanner) => {
  try {
    let response = await url.post("/notice_banners", data);
    console.log(response, "RESPONSE");
    if (response) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
};

export const editNoticeBanner = async (id: any, data: noticeBanner) => {
  try {
    let response = await url.put(`/notice_banners/${id}`, data);
    if (response) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
};
export const deleteNoticeBanner = async (id: any) => {
  try {
    let response = await url.delete(`/notice_banners/${id}`);
    if (response) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
};

