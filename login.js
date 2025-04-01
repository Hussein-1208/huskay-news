import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Cek apakah user sudah ada di Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // Jika user belum ada di Firestore, tambahkan
            await setDoc(userRef, {
                nama: "Nama User", // Bisa diisi dengan data lain jika ada
                email: user.email,
                role: "user" // Default "user"
            });
        }

        alert("Login berhasil!");
    } catch (error) {
        console.error("Error saat login:", error);
        alert(error.message);
    }
}
