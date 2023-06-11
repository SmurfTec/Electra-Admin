import axios from "axios";
const instance = axios.create({
  baseURL: "http://ec2-3-21-106-215.us-east-2.compute.amazonaws.com/",
});

export const setAuthToken = (tokeen?: any) => {
  try {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (tokeen) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${tokeen}`;
    }
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  } catch (e) {}
};
setAuthToken();

// Add an event listener to refresh the auth token when the window is reloaded.
window.addEventListener("load", setAuthToken);
// Handle 401 Unauthorized errors by redirecting to the login page
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      try {
        // localStorage.removeItem("token"); // remove the token from local storage
        // window.location.href = "/";
      } catch (e) {}
      // redirect the user to the login page
    }
    return Promise.reject(error);
  }
);

export default instance;
