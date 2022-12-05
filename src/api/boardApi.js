import axiosClient from "./axiosClient";

class BoardApi {
  getAll = (params) => {
    const url = "/Board";
    return axiosClient.get(url, params);
  };
  addBoard = (params) => {
    const url = "/Board";
    return axiosClient.post(url, params);
  };
  deleteBoard = (params) => {
    const url = "/Board?id=" + params.boardId;
    return axiosClient.delete(url, params);
  };
  renameBoard = (params) => {
    const url = "/Board";
    return axiosClient.put(url, params);
  };
}
const boardApi = new BoardApi();
export default boardApi;
