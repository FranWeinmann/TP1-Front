export function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (chars.length === 0) {
        throw new Error("Selecciona al menos ");
    }
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    return password;
}

export function checkPassword(password, txt, bar){
    const result = zxcvbn(password);
    const levels = [
        { width: "20%", color: "#ef4444", text: "Muy débil" },
        { width: "40%", color: "#f97316", text: "Débil" },
        { width: "60%", color: "#eab308", text: "Normal" },
        { width: "80%", color: "#22c55e", text: "Fuerte" },
        { width: "100%", color: "#00b162", text: "Muy fuerte" }
    ];
    const level = levels[result.score];

    bar.style.width = level.width;
    bar.style.backgroundColor = level.color;
    txt.textContent = level.text;
}

export function updateSlider(slideBar, barValue, passTxt, options, levelTxt, levelBar){
    barValue.textContent = slideBar.value;
    const percent = ((slideBar.value - slideBar.min) / (slideBar.max - slideBar.min)) * 100;

    slideBar.style.background = `
        linear-gradient(to right, 
            #10b981 ${percent}%, 
            #e5e5e5 ${percent}%)
        `;
    try {
        const pass = generatePassword(barValue.textContent, options.uppercase, options.lowercase, options.numbers, options.symbols);
        passTxt.textContent = pass;
        checkPassword(pass, levelTxt, levelBar);
    } catch (err) {
        console.log(err.message);
    }
}

export async function loadUser() {
    try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (data.user) {
            return `Welcome Back, ${data.user.full_name}`;
        } else {
            return "Welcome Back";
        }
    } catch (err) {
        console.log(err);
    }
}

export async function login(email, password) {
    if (!email || !password){
        console.log("Completa todos los campos");
        return;
    }
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.ok) {
        window.location.href='home';
    } else {
        console.log(data.error);
    }
}

export async function signup(full_name, email, password) {
    const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ full_name, email, password })
    });

    const data = await res.json();

    if (data.ok) {
        window.location.href='home';
    } else {
        console.log(data.error);
    }
}

export async function savePassword(password) {
    const res = await fetch("/api/passwords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (data.ok) {
        console.log("Guardado");
    } else {
        console.log(data.error);
    }
}

export async function deletePassword(id) {
    const res = await fetch("/api/passwords/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });

    const data = await res.json();
    if (data.ok) {
        console.log("Eliminado");
    }
}