import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
const db = getFirestore();

async function tampilkanUser() {
    const usersList = document.getElementById("usersList");

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        usersList.innerHTML = ""; // Bersihkan daftar sebelumnya

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const li = document.createElement("li");
            li.textContent = `${userData.nama} - ${userData.email} (${userData.role})`;
            usersList.appendChild(li);
        });

    } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Cek apakah user adalah admin
        const userRef = collection(db, "users");
        getDocs(userRef).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id === user.uid && doc.data().role === "admin") {
                    tampilkanUser();
                }
            });
        });
    } else {
        alert("Anda harus login sebagai admin untuk melihat daftar pengguna!");
        window.location.href = "login.html"; // Redirect ke login
    }
});
