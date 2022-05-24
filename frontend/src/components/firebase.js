import React from 'react';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSgq_tpV6CRlQfwKQDSDPZsoRCYBGf0go",
  authDomain: "coffee-shop-16ba6.firebaseapp.com",
  projectId: "coffee-shop-16ba6",
  storageBucket: "coffee-shop-16ba6.appspot.com",
  messagingSenderId: "69624271973",
  appId: "1:69624271973:web:9d0f4d2b38166e07d9628c"
};

const app = initializeApp(firebaseConfig);

export default app;