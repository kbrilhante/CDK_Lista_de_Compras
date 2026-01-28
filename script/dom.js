import * as CONST from "./constants.js";
import { logIn, logOut } from "./firebase.js";

export function startup() {
    document.title = CONST.TITLE;
    document.getElementById("title").textContent = CONST.TITLE;

    const controlButtons = document.getElementById("controlButtons");
    const divLogin = createDiv(controlButtons, "col-auto", "div-login");
    createButton(divLogin, "Entrar", "btn-primary", "btn-login", logIn);
    divLogin.hidden = true;
    const divLogout = createDiv(controlButtons, "col-auto", "div-logout");
    divLogout.hidden = true;
    const divDropdown = createDiv(divLogout, "dropdown");

    // dropdown button
    const btnDropdown = createButton(divDropdown, "", "dropdown-toggle");
    btnDropdown.setAttribute("data-bs-toggle", "dropdown");
    btnDropdown.setAttribute("aria-expanded", "false");
    
    // Profile Picture
    const profilePicture = document.createElement("img");
    profilePicture.alt = "profile picture";
    profilePicture.src = "../img/CleitinCDK.png";
    profilePicture.className = "rounded";
    profilePicture.width = 32;
    profilePicture.id = "profile-picture";
    btnDropdown.appendChild(profilePicture);

    // dropdown menu
    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown-menu";
    divDropdown.appendChild(dropdownMenu);

    const liNome = document.createElement("li");
    liNome.className = "px-2"
    dropdownMenu.appendChild(liNome);
    createParagraph(liNome, "Olá!", "txt-user");
    const liDivider = document.createElement("li");
    liDivider.innerHTML = '<hr class="dropdown-divider">';
    dropdownMenu.appendChild(liDivider);
    const liSair = document.createElement("li");
    dropdownMenu.appendChild(liSair);
    const btnSair = createButton(liSair, "Sair", "", "btn-logout", logOut);
    btnSair.className = "dropdown-item";
}

/**
 * 
 * @param {HTMLElement} parent
 * @param {String} [className]
 * @param {String} [id]
 * @returns {HTMLDivElement}
 */
function createDiv(parent, className, id) {
    const div = document.createElement("div");
    if (className) div.className = className;
    if (id) div.id = id;
    parent.appendChild(div);
    return div;
}

/**
 * 
 * @param {HTMLElement} parent 
 * @param {String} [text] 
 * @param {String} [otherClassNames] 
 * @param {String} [id] 
 * @param {Function} [callback] 
 * @returns {HTMLButtonElement}
 */
function createButton(parent, text, otherClassNames, id, callback) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn";
    if (text) btn.textContent = text;
    if (otherClassNames) {
        btn.className += " ";
        btn.className += otherClassNames;
    }
    if (id) btn.id = id;
    if (callback) btn.onclick = callback;
    parent.appendChild(btn);
    return btn;
}

/**
 * 
 * @param {HTMLElement} parent 
 * @param {String} text 
 * @param {String} [id] 
 * @returns {HTMLParagraphElement}
 */
function createParagraph(parent, text, id) {
    const p = document.createElement("p");
    p.textContent = text;
    if (id) p.id = id;
    parent.appendChild(p);
    return p;
}