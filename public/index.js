// ------------------------------- Sign up ---------------------------------

const submitSignup = document.getElementsByClassName('submit-signup')[0];
const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', userSignup);

async function userSignup(e) {
    e.preventDefault();
    const usernameField = signupForm.username.value;
    const emailField = signupForm.email.value;
    const passwordField = signupForm.password.value;

    try {
        const postSignup = await fetch('/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameField, email: emailField, password: passwordField }),
        });
        const content = await postSignup.json();
        
        console.log(content);
    }
    catch (err) {
        console.log(err)
    }
}

// ------------------------------- Login -------------------------------------

const loginForm = document.getElementsByClassName('login-form')[0];

loginForm.addEventListener('submit', userLogin);

async function userLogin(e) {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        const postLogin = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const content = await postLogin.json();

        console.log(content);
        
        if (content.user) {
            location.assign('/portal');
        }
    }
    catch (err) {
        console.log(err);
    }
}