<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Berita - Huskay News</title>
</head>
<body>

    <h1>Tambah Berita</h1>

    <form>
        <input type="text" id="judulBerita" placeholder="Judul Berita">
        <textarea id="isiBerita" placeholder="Isi Berita"></textarea>
        <button type="button" id="submitBerita">Kirim</button>
    </form>

    <script type="module">
        // Import Firebase SDK
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        // Firebase Configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDn1OF9HxmJVS_Bj3eOPL3brTUw_YixVZo",
            authDomain: "huskay-news.firebaseapp.com",
            projectId: "huskay-news",
            storageBucket: "huskay-news.appspot.com",
            messagingSenderId: "675892308818",
            appId: "1:675892308818:web:199b452f50a4888b08688b",
            measurementId: "G-PPE5YWJPM9"
        };

        // Inisialisasi Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Fungsi untuk menambahkan berita ke Firestore
        async function tambahBerita(judul, isi) {
            try {
                await addDoc(collection(db, "berita"), {
                    judul: judul,
                    isi: isi,
                    timestamp: new Date()
                });
                alert("Berita berhasil ditambahkan!");
                document.getElementById("judulBerita").value = "";
                document.getElementById("isiBerita").value = "";
            } catch (e) {
                console.error("Error saat menambahkan berita: ", e);
            }
        }

        // Event Listener untuk tombol submit
        document.getElementById("submitBerita").addEventListener("click", function() {
            let judul = document.getElementById("judulBerita").value.trim();
            let isi = document.getElementById("isiBerita").value.trim();
            
            if (judul === "" || isi === "") {
                alert("Judul dan isi berita tidak boleh kosong!");
                return;
            }

            tambahBerita(judul, isi);
        });
    </script>

</body>
</html>
