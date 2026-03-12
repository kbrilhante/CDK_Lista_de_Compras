import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, provider } from "./firebase-config.js";

// Função para Logar
export function loginGoogle() {
    // Retorna a Promessa para o main.js decidir o que fazer (ex: dar um console.log ou alerta)
    return signInWithPopup(auth, provider);
}

// Função para Deslogar
export function logoutGoogle() {
    return signOut(auth);
}

// O "Vigia" do Login
// Recebe uma função (callback) que será executada toda vez que o status mudar
export function monitorarStatusAuth(funcaoDeCallback) {
    onAuthStateChanged(auth, (user) => {
        funcaoDeCallback(user);
    });
}