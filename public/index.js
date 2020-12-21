const submitSignup = document.getElementsByClassName('submit-signup')[0];
const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', userSignup);

async function userSignup(e) {
    e.preventDefault();
    const usernameField = signupForm.username.value;
    const emailField = signupForm.email.value;
    const passwordField = signupForm.password.value;

    try {
        const postRequest = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username: usernameField, email: emailField, password: passwordField }),
            headers: { "Content-Type": "application/json" }
        });
        const content = await postRequest.json();
        
        console.log(content);
    }
    catch (err) {
        console.log(err)
    }
    

}