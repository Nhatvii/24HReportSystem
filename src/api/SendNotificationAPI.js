import axiosClient from "./axiosClient";

class SendNotifyAPI {
  sendNotify = (params) => {
    const url = "https://fcm.googleapis.com/fcm/send";
    return axiosClient.post(url, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAA18R_leU:APA91bFs4IswdpTTW64y8Y5YyhZ43JAMr74vDjdnC1no4wWPraCQsgK5s4kfxT_BB1OIb2TeOibIIwno-mf5RtUp_88aoOQzj3lFG9EXiONntpxV0eEMMAbk-oKlt6ZKoikyG-ET5BOE",
      },
    });
  };
}
const sendNotifyAPI = new SendNotifyAPI();
export default sendNotifyAPI;
