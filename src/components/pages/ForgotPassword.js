import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = (props) => {
    const [error, setError] = useState(<p className="text-light">Please Enter Your Email!</p>);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');

        if (email === "") {
            setError(<p className="text-danger">Please Enter Your Email!</p>)
        } else {
            setError(<p className="text-success">Please Check Your Email Inbox!</p>)
            axios.get()
            document.getElementById('passreset-form').reset();
        }
    }

    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='rounded mt-5 text-center'>
                <h2 className=' mt-5 mb-4'>Forgot Password</h2>
                <div className=' mt-3'>{error}</div>
                <form id="passreset-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={handleSubmit}>
                    <input type="email" name='email' id="email" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="Email address" />
                    <button className="btn btn-dark col-12 mt-2 mb-2" autoFocus='2' type="submit">Get Email</button>
                    <NavLink to="/login" autoFocus='3' className='text-decoration-none text-dark' >Login</NavLink>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword