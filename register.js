import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "API_KEY_KAMU",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Fungsi Registrasi User
async function registerUser(email, password, nama) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Simpan user ke Firestore dengan role default "user"
        await setDoc(doc(db, "users", user.uid), {
            nama: nama,
            email: email,
            role: "user"  // Admin harus diubah manual di Firestore
        });

        alert("Registrasi berhasil!");
    } catch (error) {
        console.error("Error saat registrasi:", error);
        alert(error.message);
    }
}

// Cek Role User Saat Login
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            if (userData.role === "admin") {
                document.getElementById("tambahBeritaButton").style.display = "block";
            } else {
                document.getElementById("tambahBeritaButton").style.display = "none";
                alert("Hanya admin yang bisa menambahkan berita!");
            }
        }
    }
});

// Event listener untuk tombol register
document.getElementById("registerButton").addEventListener("click", function() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const nama = document.getElementById("nama").value.trim();

    if (email === "" || password === "" || nama === "") {
        alert("Semua kolom harus diisi!");
        return;
    }

    registerUser(email, password, nama);
});
