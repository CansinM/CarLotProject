import { auth } from "./firebaseConfig.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Kullanıcı giriş fonksiyonu
function signIn() {
    document.getElementById("signInForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Giriş Başarılı! 🚀");
                window.location.href = "index.html"; 
            })
            .catch((error) => {
                alert("Hata: " + error.message);
            });
    });
}

// Kullanıcı kayıt fonksiyonu
function signUp() {
    document.getElementById("signUpForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Kayıt Başarılı! 🎉");
                window.location.href = "signIn.html"; 
            })
            .catch((error) => {
                alert("Hata: " + error.message);
            });
    });
}

// Kullanıcı çıkış fonksiyonu
function handleAuthState() {
    const authButtons = document.querySelector(".auth-buttons");
    const userIconContainer = document.createElement("div");
    userIconContainer.classList.add("user-icon-container");

    const userIcon = document.createElement("i");
    userIcon.classList.add("fas", "fa-user-circle", "user-icon");
    userIcon.style.fontSize = "24px";
    userIcon.style.cursor = "pointer";

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Sign Out";
    logoutButton.classList.add("logout-button");
    logoutButton.style.display = "none"; 

    userIconContainer.appendChild(userIcon);
    userIconContainer.appendChild(logoutButton);
    document.querySelector(".header-container").appendChild(userIconContainer);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            authButtons.style.display = "none"; 
            userIconContainer.style.display = "flex"; 
        } else {
            authButtons.style.display = "flex"; 
            userIconContainer.style.display = "none"; 
        }
    });

    userIcon.addEventListener("click", () => {
        logoutButton.style.display = logoutButton.style.display === "none" ? "block" : "none";
    });

    logoutButton.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            alert("Çıkış yapılamadı: " + error.message);
        });
    });
}

// Sayfa yüklendiğinde başlat
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("signInForm")) signIn();
    if (document.getElementById("signUpForm")) signUp();
    handleAuthState();
});
