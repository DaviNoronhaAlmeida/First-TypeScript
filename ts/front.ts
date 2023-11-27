////////////// custom element ////////////////////////
let emailvalue: string;
let namevalue: string;
let passwordvalue: string;

class EmailInput extends HTMLElement {
    private emailInput: HTMLInputElement;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.emailInput = document.createElement("input");
        this.emailInput.type = "email";
        this.emailInput.placeholder = "E-mail";
        this.emailInput.onchange = this.check;
        shadow.appendChild(this.emailInput);
    }

    check(e: any) {
        try {
            new EmailValidator(e.target.value);
            emailvalue = e.target.value;
        } catch (error) {
            e.target.value = "";
            alert("Email inválido!");
            return;
        }
    }
}

class NameInput extends HTMLElement {
    private nameInput: HTMLInputElement;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.nameInput = document.createElement("input");
        this.nameInput.type = "text";
        this.nameInput.placeholder = "Nome";
        this.nameInput.onchange = this.check;
        shadow.appendChild(this.nameInput);
    }

    check(e: any) {
        try {
            new NameValidator(e.target.value);
            namevalue = e.target.value;
        } catch (error) {
            e.target.value = "";
            alert("Nome inválido!");
            return;
        }
    }
}

class PasswordInput extends HTMLElement {
    private passwordInput: HTMLInputElement;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.passwordInput = document.createElement("input");
        this.passwordInput.type = "password";
        this.passwordInput.placeholder = "Senha";
        this.passwordInput.onchange = this.check;
        shadow.appendChild(this.passwordInput);
    }

    check(e: any) {
        try {
            new PasswordValidator(e.target.value);
            passwordvalue = e.target.value;
        } catch (error) {
            e.target.value = "";
            alert("Senha inválido!");
            return;
        }
    }
}

customElements.define("email-input", EmailInput);
customElements.define("name-input", NameInput);
customElements.define("password-input", PasswordInput);

//////////// Validator ////////////////////////////

abstract class RegexValidator {
    constructor(data: string) {}

    get regex() {
        return new RegExp("");
    }
}

class EmailValidator implements RegexValidator {
    constructor(data: string) {
        const reg = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const valid = reg.test(data);
        if (!valid) {
            throw new Error("O formato está errado");
        }
    }

    get regex() {
        return new RegExp("/^(w{1,}@w{1,}.(w{3})(.w{2}){0,1})$/gim");
    }
}

class PasswordValidator implements RegexValidator {
    constructor(data: string) {
        const reg = /^w{1,}$/gim;
        const valid = reg.test(data);
        if (!valid) {
            throw new Error("O formato está errado");
        }
    }

    get regex() {
        return new RegExp("/^w{1,}$/gim");
    }
}

class NameValidator implements RegexValidator {
    constructor(data: string) {
        const reg = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const valid = reg.test(data);
        if (!valid) {
            throw new Error("O formato está errado");
        }
    }

    get regex() {
        return new RegExp("/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim");
    }
}

///////////// Interface /////////////////////////

interface APIResponse<T> {
    data: T;
    errors: Array<string>;
}

interface UserData {
    id: number;
    email: string;
    name: string;
}

interface LoginData {
    id: number;
}

document.getElementById("btnCadastrar")?.addEventListener("click", cadastrar);
document.getElementById("btnLogar")?.addEventListener("click", logar);
document.getElementById("btnAtualizar")?.addEventListener("click", atualizar);

async function cadastrar() {
    if (emailvalue === undefined) return;
    if (namevalue === undefined) return;
    if (passwordvalue === undefined) return;

    const res = await fetch("http://localhost:8000/accounts/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailvalue,
            name: namevalue,
            password: passwordvalue,
        }),
    });
}

async function logar() {
    if (emailvalue === undefined) return;
    if (passwordvalue === undefined) return;

    const res = await fetch("http://localhost:8000/accounts/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailvalue, password: passwordvalue }),
    });
}

async function atualizar() {
    if (emailvalue === undefined) return;
    if (namevalue === undefined) return;
    if (passwordvalue === undefined) return;

    const res = await fetch("http://localhost:8000/accounts/", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailvalue,
            name: namevalue,
            password: passwordvalue,
        }),
    });
}
