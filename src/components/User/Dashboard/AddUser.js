import React from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            error: <p className="text-light">Please Enter Details!</p>
        }
    }

    handleSubmit = async (e) => {
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
        try {
            const response = await axios.post('http://localhost:8000/api/users/users/', data, {
                headers: {
                    'Authorization': 'Bearer ' + this.state.token
                }
            })
            document.getElementById('user-form').reset();
            this.setState({ error: <p className="text-success">{response?.data?.msg}!</p> })
        } catch (err) {
            if (err?.response?.data?.errors?.email) {
                this.setState({ error: <p className="text-danger">{err?.response?.data?.errors?.email}!</p> })
            } else if (err?.response?.data?.errors?.cnic) {
                this.setState({ error: <p className="text-danger">{err?.response?.data?.errors?.cnic}!</p> })
            }
        }
        // axios.post('http://localhost:8000/api/users/users/', data, {
        //     headers: {
        //         'Authorization': 'Bearer ' + this.state.token
        //     }
        // }).then(res => {
        //     console.log("I am res")
        //     this.setState({ error: <p className="text-danger">{res?.data?.msg}!</p> })
        //     document.getElementById('user-form').reset();
        //     const navigate = useNavigate();
        //     navigate(-1);
        // })
        // .catch(err => {
        //     // if(err?.response?.status===404)
        //     console.log("I am Here")
        //     this.setState({ error: <p className="text-danger">{err?.response?.data?.error}!</p> })
        // });
    }

    render() {
        return (
            <>
                <div className='container-fluid d-flex justify-content-center'>
                    <div className='rounded text-center'>
                        <h2 className='mt-2 mb-1'>New User</h2>
                        <div className=' mt-2'>{this.state.error}</div>
                        <div className="text-dark bg-light rounded">
                            <form id="user-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={this.handleSubmit}>
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
                                <NavLink className="link-stretched text-decoration-none text-dark" to="/dashboard/users">View Users</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddUser
