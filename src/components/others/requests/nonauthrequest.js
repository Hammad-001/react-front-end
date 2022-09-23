/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";


// For Login
const handleLogin = (e, setError, setAuth) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    if (email === "" && password === "") {
        setError(<p className="text-danger">All Fields are Required!</p>)
    } else if (email === "") {
        setError(<p className="text-warning">Please Enter Your Email!</p>)
    } else if (password === "") {
        setError(<p className="text-warning">Please Enter Your Password!</p>)
    } else {
        axios.post('http://localhost:8000/api/users/login/', { email: email, password: password })
            .then(response => {
                const usertype = response.data.usertype;
                const token = response.data.token;
                const first_name = response.data.first_name;

                setAuth({ usertype, token, first_name });

                Cookies.set('email', email, { expires: 1 });
                Cookies.set('token', token, { expires: 1 });
                Cookies.set('first_name', first_name, { expires: 1 });
                Cookies.set('usertype', usertype, { expires: 1 });

                document.getElementById('login-form').reset();
                setError(<p className="text-danger">User Logged in Successfully!</p>)
                
                return true;

            })
            .catch(err => {
                setError(<p className="text-danger">{err?.response?.data?.error}!</p>)
                return false;
            });
    }
}

// For Forgot Password
const handleForgotPassword = (e, setError) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');

    if (email === "") {
        setError(<p className="text-danger">Please Enter Your Email!</p>)
    } else {
        axios.post('http://localhost:8000/api/users/password-reset/', { email: email })
            .then(response => {
                setError(<p className="text-success">{response?.data?.msg}!</p>)
                return true;
            })
            .catch(err => {
                setError(<p className="text-danger">User does not exists!</p>)
                return false;
            });
    }
}

// For Reset Password
const handleResetPassword = (e, setError, id, token) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password1 = form.get('password1')
    const password2 = form.get('password2')

    if (password1 === "" && password2 === "") {
        setError(<p className="text-danger">All Fields are Required!</p>)
    } else if (password1 === "" || password2 === "") {
        setError(<p className="text-warning">Please Enter Your password!</p>)
    } else if (password1 !== password2) {
        setError(<p className="text-warning">You Password Does not Match!</p>)
    }
    else {
        axios.post('http://localhost:8000/api/users/password-reset/' + id + "/" + token + "/", { password: password1 })
            .then(response => {
                setError(<p className="text-success">Password Reset! You can Now Login!</p>)
                document.getElementById('resetpass-form').reset();
                return true;
            })
            .catch(err => {
                setError(<p className="text-danger">{err?.response?.data?.errors?.non_field_errors[0]}!</p>)
                return false;
            });
    }
}

export default handleLogin
export { handleForgotPassword, handleResetPassword }