import axios from "axios";
// import queryString from "query-string";
const axiosClient = axios.create({
  baseURL: "https://24hcanhbao.com/api",
  // baseURL: "https://24hreportsystemapi.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
  // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //   handle token here
  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
