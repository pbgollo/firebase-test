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
});

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

var db = firebase.database().ref("loginForm/" + email);

document.getElementById("registerForm").addEventListener("submit", submitForm);
 
function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var email = getElementVal("email");
    var password = getElementVal("password");

    saveUser(name, email, password);

    document.querySelector(".alert").style.display = "block";

    document.getElementById("registerForm").reset();

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 5000);
}

const saveUser = (name, email, password) => {
    var newUserForm = db.push();
    newUserForm.set({
        name: name,
        email: email,
        password: password,
    })
};

const getElementVal = (id) => {
    return document.getElementById(id).value
};