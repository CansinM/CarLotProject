// Firebase modüllerini içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyDsxXz6sBL3xm-DDOOW4rsWfQ0Zh4pKHf4",
    authDomain: "carlot-2a929.firebaseapp.com",
    projectId: "carlot-2a929",
    storageBucket: "carlot-2a929.firebasestorage.app",
    messagingSenderId: "1022260912789",
    appId: "1:1022260912789:web:73b74663cdd599b7b4b19c",
    measurementId: "G-5F2RC50QRY"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Giriş yap fonksiyonu
function signIn() {
    document.getElementById("signInForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Giriş Başarılı! 🚀");
                window.location.href = "index.html"; // Kullanıcıyı ana sayfaya yönlendir
            })
            .catch((error) => {
                alert("Hata: " + error.message);
            });
    });
}

// Kayıt ol fonksiyonu
function signUp() {
    document.getElementById("signUpForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Kayıt Başarılı! 🎉");
                window.location.href = "signIn.html"; // Kullanıcıyı giriş sayfasına yönlendir
            })
            .catch((error) => {
                alert("Hata: " + error.message);
            });
    });
}

// Sayfa yüklendiğinde ilgili fonksiyonları çalıştır
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("signInForm")) {
        signIn();
    }
    if (document.getElementById("signUpForm")) {
        signUp();
    }
});