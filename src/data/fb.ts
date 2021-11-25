import * as fireBase from "firebase/app";
import * as fireStore from "firebase/firestore";
import * as fireAuth from "firebase/auth";

const fb = { ...fireBase, ...fireStore, ...fireAuth };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const app = fb.initializeApp(firebaseConfig);
export const auth = fb.getAuth(app);
export const store = fb.getFirestore(app);

export default fb;
