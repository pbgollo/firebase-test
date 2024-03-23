import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

// Comportamento do Formulário
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    document.querySelector(".alertLogin").style.display = "none";
    document.getElementById("loginForm").reset();
    document.getElementById("registerForm").reset();
});

const getElementVal = (id) => {
    return document.getElementById(id).value
};

// Configuração do firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjcUjtIDsuTI3N5ITWRTpWHygwcnfA2F8",
    authDomain: "fir-test-8ebf9.firebaseapp.com",
    databaseURL: "https://fir-test-8ebf9-default-rtdb.firebaseio.com",
    projectId: "fir-test-8ebf9",
    storageBucket: "fir-test-8ebf9.appspot.com",
    messagingSenderId: "772220367580",
    appId: "1:772220367580:web:885d8df18e5c354abcba19"
};

const app = initializeApp(firebaseConfig);

// Autenticação
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const googleLogin = document.getElementById("googleBtn");

googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    document.querySelector(".alertLogin").style.color = "rgb(66,238,118)";
    document.querySelector(".alertLogin").innerText = "Login com o Google bem-sucedido!";

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    document.querySelector(".alertLogin").style.color = "rgb(244,67,54)";
    document.querySelector(".alertLogin").innerText = "Erro ao logar com o Google!";

  });
})

// Banco de dados
const db = getDatabase();

document.getElementById("registerForm").addEventListener("submit", submitForm);
 
function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var email = getElementVal("email");
    var password = getElementVal("password");

    saveUser(name, email, password);

    document.querySelector(".alert").style.display = "block";

    setTimeout(() => {
        document.getElementById("registerForm").reset();
    }, 2000);

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 5000);
};

const saveUser = (name, email, password) => {
    db.ref("users/" + name).set({
        name: name,
        email: email,
        password: password,
    })
};

document.getElementById("loginForm").addEventListener("submit", getUser);

function getUser(e) {
    e.preventDefault();

    var name = getElementVal("loginName");
    var password = getElementVal("loginPassword");

    // Criando uma referência específica para o usuário
    const user_ref = ref(db, "users/" + name);

    // Lendo os dados do usuário
    onValue(user_ref, (snapshot) => {
        const data = snapshot.val();
        if (data) { 
            if (data.password === password) {
                document.querySelector(".alertLogin").style.color = "rgb(66,238,118)";
                document.querySelector(".alertLogin").innerText = "Login bem-sucedido!";
            } else {
                document.querySelector(".alertLogin").style.color = "rgb(244,67,54)";
                document.querySelector(".alertLogin").innerText = "Senha incorreta!"; 
            }
        } else {
            document.querySelector(".alertLogin").style.color = "rgb(244,67,54)"; 
            document.querySelector(".alertLogin").innerText = "Usuário não encontrado!";
        }
    });

    document.querySelector(".alertLogin").style.display = "block";
}