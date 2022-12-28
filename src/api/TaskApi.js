import axiosClient from "./axiosClient";

class TaskApi {
  getAllManager = (params) => {
    const url = "/Task";
    return axiosClient.get(url, params);
  };
  getAll = (params) => {
    const url = "/Task?BoardId=" + params.BoardId;
    return axiosClient.get(url, params);
  };
  getAllByIdAndStatus = (params) => {
    const url =
      "/Task?EditorID=" + params.EditorID + "&Status=" + params.status;
    return axiosClient.get(url, params);
  };
  getAllByIdAndStatusAndBoard = (params) => {
    const url =
      "/Task?EditorID=" +
      params.EditorID +
      "&Status=" +
      params.status +
      "&BoardId=" +
      params.boardId;
    return axiosClient.get(url, params);
  };
  getAllByStatusAndBoard = (params) => {
    const url = "/Task?Status=" + params.status + "&BoardId=" + params.boardId;
    return axiosClient.get(url, params);
  };
  getAllByStatus = (params) => {
    const url = "/Task?Status=" + params.status;
    return axiosClient.get(url, params);
  };
  updateStatus = (params) => {
    const url = "/Task/StatusUpdate";
    return axiosClient.put(url, params);
  };
  getById = (params) => {
    const url = "/Task/" + params.id;
    return axiosClient.get(url);
  };
  create = (params) => {
    const url = "/Task";
    return axiosClient.post(url, params);
  };
  taskReviewFilter = (params) => {
    const url =
      "/Task/TaskReviewFilter?boardID=" +
      params.boardId +
      "&percent=" +
      params.percent;
    return axiosClient.put(url, params);
  };
}
const taskApi = new TaskApi();
export default taskApi;
