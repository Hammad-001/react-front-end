import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../User/UserAuth';
import { useContext } from 'react';

const Login = (props) => {
    const { setAuth } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const [error, setError] = useState(<p className="text-light">Please Enter Your Details!</p>);

    const handleSubmit = async (e) => {
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
                    const token = response.data.token;
                    const usertype = response.data.usertype;

                    setAuth({ email, password, token, usertype });

                    localStorage.setItem('email', email);
                    localStorage.setItem('token', token);
                    localStorage.setItem('usertype', usertype);

                    document.getElementById('login-form').reset();
                    setError(<p className="text-danger">User Logged in Successfully!</p>)
                    navigate(from, { replace: true });
                })
                .catch(err => {
                    setError(<p className="text-danger">{err?.response?.data?.error}!</p>)
                });
        }
    }

    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='rounded mt-5 text-center'>
                <h2 className=' mt-5 mb-4'>Login</h2>
                <div className=' mt-3'>{error}</div>
                <form id="login-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={handleSubmit}>
                    <input type="email" name='email' id="email" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="Email address" />
                    <input type="password" name="password" id="password" className='col-12 form-control mt-2 mb-2' autoFocus='2' placeholder='Password' />
                    <button className="btn btn-dark col-12 mt-2 mb-2" autoFocus='3' type="submit">Login</button>
                    <NavLink to="/forgotpassword" autoFocus='4' className='text-decoration-none text-dark' >Forgotten Password</NavLink>
                </form>
            </div>
        </div>
    )
}

export default Login;