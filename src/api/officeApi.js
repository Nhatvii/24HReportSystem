import axiosClient from "./axiosClient";

class OfficeApi {
  getAll = (params) => {
    const url = "/Office";
    return axiosClient.get(url, params);
  };
  getById = (params) => {
    const url = "/Office/" + params.id;
    return axiosClient.get(url);
  };
  update = (params) => {
    const url = "/Office";
    return axiosClient.put(url, params);
  };
  delete = (params) => {
    const url = "/Office/" + params.id;
    return axiosClient.delete(url);
  };
  create = (params) => {
    const url = "/Office";
    return axiosClient.post(url, params);
  };
}
const officeApi = new OfficeApi();
export default officeApi;
