// 1. Importar as funções que precisamos do Firebase (direto da CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Sua Configuração (Copie do Console do Firebase > Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyAny-V_uAkM4AAVFoI1lB3pB_pLaKNX5UY",
  authDomain: "listadecompras-b28ec.firebaseapp.com",
  databaseURL: "https://listadecompras-b28ec-default-rtdb.firebaseio.com",
  projectId: "listadecompras-b28ec",
  storageBucket: "listadecompras-b28ec.firebasestorage.app",
  messagingSenderId: "763712750728",
  appId: "1:763712750728:web:e98f37b9507f08c98dcb3d",
  measurementId: "G-JNW0P3RFP8"
};

// 3. Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // O serviço de autenticação
const provider = new GoogleAuthProvider(); // O provedor do Google

export function logIn() {
    console.log("Signing in")
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("Login realizado:", result.user);
        console.log(result)
    })
    .catch((error) => {
        console.error("Erro de login:", error)
    });
}

export function logOut() {
    signOut(auth).then(() => {
        console.log("Usuário saiu.")
    });
}

// 7. O "Ouvinte" Mágico (Monitora o estado em tempo real)
// É aqui que a mágica acontece. Se der F5, ele lembra do usuário.
onAuthStateChanged(auth, (user) => {
    if (user) {
        // --- USUÁRIO LOGADO ---
        console.log("Usuário conectado:", user.uid);
        console.log(user)

        document.getElementById("div-login").hidden = true;
        document.getElementById("div-logout").hidden = false;
        document.getElementById("profile-picture").src = user.photoURL;
        // document.getElementById("txt-user").innerText = `Olá, ${user.displayName}`
        
        // AQUI vamos chamar a função para carregar os grupos depois
        // carregarMeusGrupos(user.uid);
        
    } else {
        // --- USUÁRIO DESLOGADO ---
        console.log("Nenhum usuário conectado.");

        document.getElementById("div-login").hidden = false;
        document.getElementById("div-logout").hidden = true;
    }
});
