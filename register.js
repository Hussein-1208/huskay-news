import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
const db = getFirestore();

async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Tambahkan user ke Firestore dengan default role "user"
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: "user" // Default role untuk user biasa
        });

        alert("Registrasi berhasil!");
    } catch (error) {
        console.error("Error saat registrasi:", error);
        alert(error.message);
    }
}

// Event listener untuk tombol register
document.getElementById("registerButton").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    registerUser(email, password);
});
