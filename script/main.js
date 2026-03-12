import { iniciarInterface, atualizarEstadoUsuario } from "./ui-controller.js";
import { loginGoogle, logoutGoogle, monitorarStatusAuth } from "./auth-service.js";

// 1. Inicializa a UI passando as funções de controle
iniciarInterface(
    // O que fazer quando clicar em Entrar?
    async () => {
        try {
            await loginGoogle();
            console.log("Login solicitado com sucesso.");
        } catch (error) {
            console.error("Erro ao logar:", error);
            alert("Houve um erro ao tentar entrar.");
        }
    },
    // O que fazer quando clicar em Sair?
    async () => {
        try {
            await logoutGoogle();
            console.log("Logout solicitado.");
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    }
);

// 2. Configura o monitoramento do usuário
// Assim que o Firebase avisar que mudou (logou/deslogou), atualizamos a tela
monitorarStatusAuth((user) => {
    console.log("Estado de autenticação mudou:", user ? user.displayName : "Deslogado");
    
    // Atualiza a interface
    atualizarEstadoUsuario(user);

    // ---> AQUI ENTRARÁ O BANCO DE DADOS DEPOIS <---
    // if (user) {
    //    carregarListasDoBanco(user.uid);
    // }
});