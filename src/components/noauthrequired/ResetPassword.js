import React, { useState } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = (props) => {
    const { id, token } = useParams();
    const [error, setError] = useState(<p className="text-light">Please Enter New Password!</p>);

    const handleSubmit = (e) => {
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
                    setTimeout(() => { <Navigate to="/login" replace={true} /> }, 3000)
                    document.getElementById('resetpass-form').reset();
                })
                .catch(err => {
                    if (err?.response?.status === 404) {
                        setError(<p className="text-danger">Please Try Again Later!</p>)
                    }
                });
        }
    }

    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='rounded mt-5 text-center'>
                <h2 className=' mt-5 mb-4'>Reset Password</h2>
                <div className=' mt-3'>{error}</div>
                <form id="resetpass-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={handleSubmit}>
                    <input type="password" name='password1' id="password1" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="Password" />
                    <input type="password" name="password2" id="password2" className='col-12 form-control mt-2 mb-2' autoFocus='2' placeholder='Verify Password' />
                    <button className="btn btn-dark col-12 mt-2 mb-2" autoFocus='3' type="submit">Reset Password</button>
                    <NavLink to="/login" autoFocus='4' className='text-decoration-none shadow-none text-dark' > Login </NavLink>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword