import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

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
