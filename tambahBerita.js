import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

document.getElementById("submitBerita").addEventListener("click", async function() {
    const user = auth.currentUser;

    if (!user) {
        alert("Anda harus login untuk menambahkan berita!");
        return;
    }

    // Ambil data user dari Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().role !== "admin") {
        alert("Hanya admin yang bisa menambahkan berita!");
        return;
    }

    // Jika user adalah admin, lanjutkan menambah berita
    let judul = document.getElementById("judulBerita").value.trim();
    let isi = document.getElementById("isiBerita").value.trim();

    if (judul === "" || isi === "") {
        alert("Judul dan isi berita tidak boleh kosong!");
        return;
    }

    try {
        await addDoc(collection(db, "berita"), {
            judul: judul,
            isi: isi,
            timestamp: new Date(),
            author: user.email
        });
        alert("Berita berhasil ditambahkan!");
        document.getElementById("judulBerita").value = "";
        document.getElementById("isiBerita").value = "";
    } catch (e) {
        console.error("Error saat menambahkan berita: ", e);
    }
});
