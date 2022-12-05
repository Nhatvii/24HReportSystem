import axiosClient from "./axiosClient";

class SOSApi {
  getAllToday = (params) => {
    const url = "/Notify?IsToday=true";
    return axiosClient.get(url, params);
  };
  getAll = (params) => {
    const url = "/Notify";
    return axiosClient.get(url, params);
  };
  sendSOS = (params) => {
    const url = "/Office/GetDirectionSOS";
    return axiosClient.put(url, params.sos);
  };
  completeSOS = (params) => {
    const url = "/Notify/CompleteNotify";
    return axiosClient.put(url, params.sos);
  };
}
const sosApi = new SOSApi();
export default sosApi;
