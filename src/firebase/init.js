import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

import { firebaseConfig } from "./config"

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
