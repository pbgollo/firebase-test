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
    document.getElementById("loginForm").reset();
    document.getElementById("registerForm").reset();
});

const getElementVal = (id) => {
    return document.getElementById(id).value
};

const firebaseConfig = {
    apiKey: "AIzaSyDjcUjtIDsuTI3N5ITWRTpWHygwcnfA2F8",
    authDomain: "fir-test-8ebf9.firebaseapp.com",
    databaseURL: "https://fir-test-8ebf9-default-rtdb.firebaseio.com",
    projectId: "fir-test-8ebf9",
    storageBucket: "fir-test-8ebf9.appspot.com",
    messagingSenderId: "772220367580",
    appId: "1:772220367580:web:885d8df18e5c354abcba19"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();

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

    var user_ref = db.ref("users/" + name);

    user_ref.once("value", function(snapshot){
        var data = snapshot.val();
        if (data) { // Verifica se o usuário existe
            if (data.password === password) {
                console.log("Login bem-sucedido!");
                document.querySelector(".alertLogin").innerText = "Login bem-sucedido!";
                document.querySelector(".alertLogin").style.color = "rgb(66,238,118)";
            } else {
                document.querySelector(".alertLogin").innerText = "Senha incorreta!";
               document.querySelector(".alertLogin").style.color = "rgb(244,67,54)"; 
            }
        } else {
            document.querySelector(".alertLogin").innerText = "Usuario não encontrado!";
            document.querySelector(".alertLogin").style.color = "rgb((244,67,54)"; 
        }
    });

    document.querySelector(".alertLogin").style.display = "block";
}