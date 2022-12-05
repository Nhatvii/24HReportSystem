import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import userApi from "./api/UserApi";
// const user_info = JSON.parse(localStorage.getItem("user_info"));
var firebaseConfig = {
  apiKey: "AIzaSyAgaeSeRcOqy7jZdEujk1LF-IXmRzkZV1Y",
  authDomain: "capstone-project-2102c.firebaseapp.com",
  projectId: "capstone-project-2102c",
  storageBucket: "capstone-project-2102c.appspot.com",
  messagingSenderId: "926714664421",
  appId: "1:926714664421:web:51a390b3cb103a082c8b0c",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const user_info = JSON.parse(localStorage.getItem("user_info"));
const updateToken = async (token) => {
  try {
    const params = {
      accountID: user_info.accountId,
      tokenId: token,
    };
    await userApi.update(params);
  } catch (e) {
    console.log(e.message);
  }
};
export const fetchToken = async (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BO6NLoPKyB3M4jF414YmtQ95HwM-o2cvkaovfMAY78O4uKxykm3PQ_l1dnSd722kMFqUyPNPydD951Jxx8OMkaI",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        updateToken(currentToken);
        console.log(currentToken);
        if (user_info.role.roleId === 2) {
          subscribeTokenToTopic(currentToken, "staff");
        }
        if (user_info.role.roleId === 3) {
          subscribeTokenToTopic(currentToken, "editor");
        }
        if (user_info.role.roleId === 4) {
          subscribeTokenToTopic(currentToken, "editor_manager");
        }
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Payload:" + payload);
      resolve(payload);
    });
  });
function subscribeTokenToTopic(token, topic) {
  fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
    method: "POST",
    headers: new Headers({
      Authorization: `key=AAAA18R_leU:APA91bFs4IswdpTTW64y8Y5YyhZ43JAMr74vDjdnC1no4wWPraCQsgK5s4kfxT_BB1OIb2TeOibIIwno-mf5RtUp_88aoOQzj3lFG9EXiONntpxV0eEMMAbk-oKlt6ZKoikyG-ET5BOE`,
    }),
  })
    .then((response) => {
      if (response.status < 200 || response.status >= 400) {
        console.log(response.status, response);
      }
      console.log(`"${topic}" is subscribed`);
    })
    .catch((error) => {
      console.error(error.result);
    });
  return true;
}
