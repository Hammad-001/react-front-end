import React, { useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const CreateUser = (props) => {
    const token = props.token;
    const [email, setEmail] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(<p className="text-light">Please Enter Details!</p>);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = {
            first_name: form.get('first_name'),
            last_name: form.get('last_name'),
            email: form.get('email'),
            password: form.get('password'),
            cnic: form.get('cnic'),
            usertype: form.get('usertype'),
        }
        setEmail(data.email)
        try {
            const response = await axios.post('http://localhost:8000/api/users/users/', data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            document.getElementById('user-form').reset();
            setError(<p className="text-success">{response?.data?.msg}!</p>);
        } catch (err) {
            if (err?.response?.data?.errors?.email) {
                setData(data);
                document.getElementById('click').click()
            }
        }
    }

    const handle = async (val) => {
        try {
            const response = await axios.put('http://localhost:8000/api/users/users/', { email: email, data: data, change: val }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            document.getElementById('user-form').reset();
            setError(<p className="text-success">{response?.data?.msg}!</p>)
        } catch (err) {
            setError(<p className="text-danger">Unknow Error Occured!</p>)
        }
    }
    return (
        <>
            <button type="button" className="btn btn-danger shadow-none" hidden={true} id='click' data-bs-toggle="modal" data-bs-target="#Existing"></button>
            <div className="modal fade" id="Existing" tabIndex="-1" aria-labelledby="existingModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Existing User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            This user already exists! Do you want to keep user's previous record or not?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => { handle(false); }}>No</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { handle(true); }}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid d-flex justify-content-center'>
                <div className='rounded text-center'>
                    <h2 className='mt-2 mb-1'>Create New User</h2>
                    <div className=' mt-2'>{error}</div>
                    <div className="text-dark bg-light rounded">
                        <form id="user-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={handleSubmit}>
                            <input type="text" name='first_name' id="first_name" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="First Name" required />
                            <input type="text" name="last_name" id="last_name" className='col-12 form-control mt-2 mb-2' autoFocus='2' placeholder='Last Name' required />
                            <input type="email" name='email' id="email" className='col-12 form-control mt-2 mb-2' autoFocus='3' placeholder="Email address" required />
                            <input type="password" name="password" id="password" className='col-12 form-control mt-2 mb-2' autoFocus='4' placeholder='Password' required />
                            <input type="text" maxLength={13} minLength={13} onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) { event.preventDefault(); }
                            }}
                                name='cnic' id="cnic" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="CNIC" required />
                            <select className="form-select text-center" name='usertype' aria-label="Select Role">
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            <button className="btn btn-dark shadow-none col-12 mb-2 mt-2" autoFocus='3' type='submit'>Save</button>
                            <NavLink className="link-stretched text-decoration-none text-dark" to="/u/users">View Users</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateUser
