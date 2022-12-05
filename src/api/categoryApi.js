import axiosClient from "./axiosClient";

class CategoryApi {
  getAllRoot = (params) => {
    const url = "/Category";
    return axiosClient.get(url, params);
  };
  getByIdRoot = (params) => {
    const url = "/Category/" + params.rootCategoryId;
    return axiosClient.get(url);
  };
  addRoot = (params) => {
    const url = "/Category";
    return axiosClient.post(url, params);
  };
  updateRoot = (params) => {
    const url = "/Category";
    return axiosClient.put(url, params);
  };
  deleteRoot = (params) => {
    const url = "/Category?id=" + params.id;
    return axiosClient.delete(url);
  };
  getAllSub = (params) => {
    const url = "/Category";
    return axiosClient.get(url, params);
  };
  getByIdSub = (params) => {
    const url = "/Category/" + params.rootCategoryId;
    return axiosClient.get(url);
  };
  addSub = (params) => {
    const url = "/Category";
    return axiosClient.post(url, params);
  };
  deleteSub = (params) => {
    const url = "/Category?id=" + params.id;
    return axiosClient.delete(url);
  };
  updateSub = (params) => {
    const url = "/Category";
    return axiosClient.put(url, params);
  };
}
const categoryApi = new CategoryApi();
export default categoryApi;
