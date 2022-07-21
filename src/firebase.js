import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
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

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(messaging, {
    vapidKey:
      "BO6NLoPKyB3M4jF414YmtQ95HwM-o2cvkaovfMAY78O4uKxykm3PQ_l1dnSd722kMFqUyPNPydD951Jxx8OMkaI",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);
      } else {
        console.log("No token found");
        setTokenFound(false);
        setFcmToken("");
      }
    })
    .catch((error) => {
      console.log("Error" + error);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
