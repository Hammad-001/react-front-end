import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../others/UserAuth';
import { useContext } from 'react';
import handleLogin from '../others/axiosrequests'

const Login = (props) => {
    const { setAuth } = useContext(AuthContext);
    const [error, setError] = useState(<p className="text-light">Please Enter Your Details!</p>);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    // Perform Login Functionality
    const handle = (e) => {
        const submit = handleLogin(e, setError, setAuth);
        if (submit) {
            navigate(from, { replace: true });
        }
    }
    
    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='rounded mt-5 text-center'>
                <h2 className=' mt-5 mb-4'>Login</h2>
                <div className=' mt-3'>{error}</div>
                <form id="login-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={handle}>
                    <input type="email" name='email' id="email" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="Email address" />
                    <input type="password" name="password" id="password" className='col-12 form-control mt-2 mb-2' autoFocus='2' placeholder='Password' />
                    <button className="btn btn-dark shadow-none col-12 mt-2 mb-2" autoFocus='3' type="submit">Login</button>
                    <NavLink to="/forgotpassword" autoFocus='4' className='text-decoration-none text-dark' >Forgotten Password</NavLink>
                </form>
            </div>
        </div>
    )
}

export default Login;