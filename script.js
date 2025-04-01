<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Berita - Huskay News</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: auto;
        }
        input, textarea, button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background: #007BFF;
            color: white;
            cursor: pointer;
            border: none;
        }
        button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Tambah Berita</h1>
        <form>
            <input type="text" id="judulBerita" placeholder="Judul Berita">
            <textarea id="isiBerita" placeholder="Isi Berita"></textarea>
            <button type="button" id="submitBerita">Kirim</button>
        </form>
    </div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDn1OF9HxmJVS_Bj3eOPL3brTUw_YixVZo",
            authDomain: "huskay-news.firebaseapp.com",
            projectId: "huskay-news",
            storageBucket: "huskay-news.appspot.com",
            messagingSenderId: "675892308818",
            appId: "1:675892308818:web:199b452f50a4888b08688b",
            measurementId: "G-PPE5YWJPM9"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

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
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userRef = firebase.firestore().collection("users").doc(user.uid);
        userRef.get().then((doc) => {
            if (doc.exists && doc.data().role === "admin") {
                document.getElementById("tambahBeritaButton").style.display = "block";
            } else {
                document.getElementById("tambahBeritaButton").style.display = "none";
                alert("Hanya admin yang bisa menambahkan berita!");
            }
        });
    }
});

</body>
</html>
