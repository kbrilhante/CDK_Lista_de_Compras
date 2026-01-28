import * as CONST from "./constants.js";
import { logIn, logOut } from "./firebase.js";

export function startup() {
    document.title = CONST.TITLE;
    document.getElementById("title").textContent = CONST.TITLE;

    const controlButtons = document.getElementById("controlButtons")
    const divLogin = createDiv(controlButtons, "col-auto", "div-login");
    createButton(divLogin, "Entrar", "btn-primary", "btn-login", logIn);
    const divLogout = createDiv(controlButtons, "col-auto", "div-logout");
    const divBtnLogoutRow = createDiv(divLogout, "row");
    const divBtnLogout = createDiv(divBtnLogoutRow, "col-auto mx-auto");
    createButton(divBtnLogout, "Sair", "btn-danger", "btn-logout", logOut);
    const divBtnLogoutTxt = createDiv(divLogout, "row");
    const p = createParagraph(divBtnLogoutTxt, "Olá, ", "txt-user");
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
    btn.className = "btn"
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