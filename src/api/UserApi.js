import axiosClient from "./axiosClient";

class UserApi {
  getAll = (params) => {
    const url = "/Account";
    return axiosClient.get(url, params);
  };

  getByEmail = (params) => {
    console.log(params.email);
    const url = "/Account/GetAccount?email=" + params.email;
    return axiosClient.get(url);
  };
  update = (params) => {
    const url = "/Account/";
    return axiosClient.put(url, params);
  };
  getUser = (params) => {
    const url = "/Account/GetAccount?UserId=" + params.userId;
    return axiosClient.get(url);
  };
  changePassword = (params) => {
    const url = "/Account/ChangePassword";
    return axiosClient.put(url, params);
  };
}
const userApi = new UserApi();
export default userApi;
