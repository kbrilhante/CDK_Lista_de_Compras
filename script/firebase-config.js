// Importamos o Auth e, já pensando no futuro, o Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// Inicializa o App
const app = initializeApp(firebaseConfig);

// Exporta as instâncias para usar nos outros arquivos
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app); // Já deixamos pronto pro futuro!