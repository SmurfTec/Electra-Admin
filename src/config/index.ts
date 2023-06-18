import axios from "axios";
import { CookieJar } from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
const jar = new CookieJar();
const cookies = document.cookie;
// console.log(document.cookie)
// wrapper(axios.create({ jar }))
const instance = axios.create({
  // baseURL: "http://ec2-3-21-106-215.us-east-2.compute.amazonaws.com:5000/",
  baseURL: "https://24e8-103-169-64-13.ngrok-free.app/",
  withCredentials: true,
  });
export const setAuthToken = (tokeen?: any,Refreshtoken?:any) => {
    try {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const refresh = JSON.parse(localStorage.getItem("refresh") as string);
    if (tokeen) {
      instance.defaults.headers.common["Authentication"] = `${tokeen}`;
      instance.defaults.headers.common["Refresh"] = `${Refreshtoken}`;
    }
    if (token) {
      instance.defaults.headers.common["Authentication"] = `${token}`;
      instance.defaults.headers.common["Refresh"] = `${refresh}`;
    } else {
      delete instance.defaults.headers.common["Authentication"];
      delete instance.defaults.headers.common["Refresh"];
    }
  } catch (e) {}
};
setAuthToken();

instance.interceptors.response.use(
  (response) => response
  ,
  (error) => {
    // Handle error responses
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default instance;

// import { useCookies } from 'react-cookie'

// const SignInComponent = () => {

// // ...

// const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

// async function onSubmit(values) {
//     const response = await getOauthResponse(values);

    // let expires = new Date()
    // expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
//     setCookie('access_token', response.data.access_token, { path: '/',  expires})
//     setCookie('Set-Cookie:', response.data.refresh_token, {path