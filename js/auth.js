import { auth } from "./firebaseConfig.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";


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

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Kullanıcı adını güncelle
                updateProfile(user, {
                    displayName: fullName
                }).then(() => {
                    alert("Kayıt Başarılı! 🎉");
                    window.location.href = "signIn.html"; // Kullanıcıyı giriş sayfasına yönlendir
                }).catch((error) => {
                    alert("Profil güncellenirken hata oluştu: " + error.message);
                });
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
    
            // Kullanıcı adı için span elementi oluştur
            let userNameSpan = document.querySelector(".user-name");
            if (!userNameSpan) {
                userNameSpan = document.createElement("span");
                userNameSpan.classList.add("user-name");
                userNameSpan.style.color = "#fff";
                userNameSpan.style.marginLeft = "10px";
                userNameSpan.style.fontWeight = "bold";
                userNameSpan.style.fontSize = "16px";
                userIconContainer.insertBefore(userNameSpan, logoutButton);
            }
    
            // Kullanıcı adını güncelle (Eğer boşsa email kullan)
            userNameSpan.textContent = user.displayName ? user.displayName : user.email.split("@")[0];
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
