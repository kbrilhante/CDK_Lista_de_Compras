const TITLE = "Lista de Compras";

// Recebe as ações de "O que fazer ao clicar" vindo de fora (do main.js)
export function iniciarInterface(aoClicarEmEntrar, aoClicarEmSair) {
    document.title = TITLE;
    const titleElement = document.getElementById("title");
    if (titleElement) titleElement.textContent = TITLE;

    const controlButtons = document.getElementById("control-buttons");
    
    // Área de Login
    const divLogin = createDiv(controlButtons, "col-auto", "div-login");
    // Aqui usamos a função passada por parâmetro! Injeção de dependência.
    createButton(divLogin, "Entrar", "btn-primary", "btn-login", aoClicarEmEntrar);
    
    // Área de Logout / Usuário
    const divLogout = createDiv(controlButtons, "col-auto", "div-logout");
    divLogout.hidden = true;
    
    const divDropdown = createDiv(divLogout, "dropdown");
    const btnDropdown = createButton(divDropdown, "", "dropdown-toggle");
    btnDropdown.setAttribute("data-bs-toggle", "dropdown");
    btnDropdown.setAttribute("aria-expanded", "false");
    
    // Foto de Perfil
    const profilePicture = document.createElement("img");
    profilePicture.alt = "Foto de perfil";
    profilePicture.className = "rounded";
    profilePicture.width = 32;
    profilePicture.id = "profile-picture";
    // Coloquei um placeholder caso a imagem não carregue na hora
    profilePicture.src = "https://via.placeholder.com/32"; 
    btnDropdown.appendChild(profilePicture);

    // Menu Dropdown
    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown-menu";
    divDropdown.appendChild(dropdownMenu);

    const liNome = document.createElement("li");
    liNome.className = "px-2";
    dropdownMenu.appendChild(liNome);
    createParagraph(liNome, "Olá!", "txt-user");

    const liDivider = document.createElement("li");
    liDivider.innerHTML = '<hr class="dropdown-divider">';
    dropdownMenu.appendChild(liDivider);

    const liSair = document.createElement("li");
    dropdownMenu.appendChild(liSair);
    // Ação de sair passada por parâmetro
    const btnSair = createButton(liSair, "Sair", "dropdown-item", "btn-logout", aoClicarEmSair);

    // Dark Mode
    const divMode = document.getElementById("light-dark-mode");
    createButton(divMode, "", "btn-sm", "btn-toggle-mode", toggleMode);
    toggleMode(); // Inicia o tema correto
}

// Função dedicada a atualizar a tela baseada no estado do usuário
export function atualizarEstadoUsuario(user) {
    const divLogin = document.getElementById("div-login");
    const divLogout = document.getElementById("div-logout");
    const imgProfile = document.getElementById("profile-picture");
    const txtUser = document.getElementById("txt-user");

    if (user) {
        // Usuário Logado
        divLogin.hidden = true;
        divLogout.hidden = false;
        if(imgProfile) imgProfile.src = user.photoURL;
        if(txtUser) txtUser.innerText = `Olá, ${user.displayName}`;
    } else {
        // Usuário Deslogado
        divLogin.hidden = false;
        divLogout.hidden = true;
    }
}

// --- Funções Auxiliares (mantive as suas, só organizei) ---

function createDiv(parent, className, id) {
    const div = document.createElement("div");
    if (className) div.className = className;
    if (id) div.id = id;
    parent.appendChild(div);
    return div;
}

function createButton(parent, text, otherClassNames, id, callback) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn";
    if (text) btn.textContent = text;
    if (otherClassNames) btn.classList.add(...otherClassNames.split(" ")); // Pequena melhoria pra aceitar multiplas classes
    if (id) btn.id = id;
    if (callback) btn.addEventListener("click", callback); // Melhor usar addEventListener
    parent.appendChild(btn);
    return btn;
}

function createParagraph(parent, text, id) {
    const p = document.createElement("p");
    p.textContent = text;
    if (id) p.id = id;
    parent.appendChild(p);
    return p;
}

function toggleMode() {
    const tagHTML = document.documentElement;
    const currentMode = tagHTML.getAttribute("data-bs-theme");
    const btnMode = document.getElementById("btn-toggle-mode");
    
    // Pequena verificação pra evitar erro se o botão ainda não existir
    if(!btnMode) return;

    if (currentMode == "dark") {
        tagHTML.setAttribute("data-bs-theme", "light");
        btnMode.innerHTML = '<i class="fa-solid fa-moon"></i>';
        btnMode.title = "Mudar para modo escuro";
        btnMode.classList.remove("btn-light");
        btnMode.classList.add("btn-dark");
    } else {
        tagHTML.setAttribute("data-bs-theme", "dark");
        btnMode.classList.remove("btn-dark");
        btnMode.classList.add("btn-light");
        btnMode.innerHTML = '<i class="fa-regular fa-sun"></i>';
        btnMode.title = "Mudar para modo claro";
    }
}