import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            console.log("User data:", userDoc.data());
            if (userDoc.data().role === "admin") {
                document.getElementById("tambahBeritaButton").style.display = "block";
            } else {
                document.getElementById("tambahBeritaButton").style.display = "none";
                alert("Hanya admin yang bisa menambahkan berita!");
            }
        } else {
            console.log("User document not found!");
        }
    } else {
        console.log("No user is logged in");
        document.getElementById("tambahBeritaButton").style.display = "none";
    }
});
