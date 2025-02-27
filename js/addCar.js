import { db, collection, addDoc } from "./firebaseConfig.js";

document.getElementById("addCarForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const carData = {
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        year: parseInt(document.getElementById("year").value),
        km: parseInt(document.getElementById("km").value),
        color: document.getElementById("color").value,
        price: document.getElementById("price").value,
        location: document.getElementById("location").value,
        image: document.getElementById("image").value
    };

    try {
        await addDoc(collection(db, "cars"), carData);
        alert("Araç başarıyla eklendi! 🚀");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Araç eklenirken hata oluştu:", error);
    }
});
