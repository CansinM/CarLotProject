// Firebase modüllerini içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase yapılandırma bilgileri (Gerçek değerlerle değiştir)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsxXz6sBL3xm-DDOOW4rsWfQ0Zh4pKHf4",
    authDomain: "carlot-2a929.firebaseapp.com",
    projectId: "carlot-2a929",
    storageBucket: "carlot-2a929.firebasestorage.app",
    messagingSenderId: "1022260912789",
    appId: "1:1022260912789:web:73b74663cdd599b7b4b19c",
    measurementId: "G-5F2RC50QRY"
};

// Firebase başlat ve dışa aktar
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
