import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            users: null,
            filter: '',
            user: {
                id: null,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                cnic: '',
                usertype: '',
            }
        }
    }

    handleGetRequest = async () => {
        axios.get('http://localhost:8000/api/users/users/', {
            params: {
                usertype: this.state.usertype,
            },
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        })
            .then(response => {
                this.setState({ users: response.data.users })
            })
            .catch(error => error.response)
    }

    handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('http://localhost:8000/api/users/users/', this.state.user, {
                headers: {
                    'Authorization': 'Bearer ' + this.state.token
                }
            })
            document.getElementById('update-form').reset();
            this.handleGetRequest()
        } catch (err) {
            alert(error => error.response)
        }
    }

    handleDeleteRequest = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/users/users/', {
            data: {
                id: this.state.id
            },
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        })
            .then(response => {
                this.handleGetRequest()
            })
            .catch(error => error.response)
    }

    componentDidMount(props) {
        this.handleGetRequest();
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ user: { ...this.state.user, [name]: value } })
    }

    handleFilter = async (e) => {
        e.preventDefault();
        this.handleGetRequest();
    }

    render() {
        let count = 1
        let users = null;

        if (this.state.users) {
            if (this.state.filter === '') {
                users = this.state.users
            } else {
                users = this.state.users.filter(f => f.first_name.toLowerCase().includes(this.state.filter.toLowerCase()) || this.state.filter === '')
            }
            users = users.map(
                (user) => <tr key={user.id} >
                    <td>{count++}</td>
                    <td>{user.usertype}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.cnic}</td>
                    <td>
                        <button onClick={() => { this.setState({ id: user.id }) }} type="button" className="btn btn-danger shadow-none" data-bs-toggle="modal" data-bs-target="#Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>
                        <button onClick={() => { this.setState({ user: user }) }} type="button" className="btn btn-primary shadow-none" data-bs-toggle="modal" data-bs-target="#Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                    </td>
                </tr >
            )

            return (

                <div className='container-fluid'>
                    {/* <!-- Button trigger modal --> */}

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="Delete" tabIndex="-1" aria-labelledby="DeleteModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Delete User</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Sure You want to Delete this User?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={this.handleDeleteRequest}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="Edit" tabIndex="-1" aria-labelledby="EditModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Users</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="update-form" className="bg-dark rounded" onSubmit={this.handleUpdateUser}>
                                        <select className="form-select bg-dark text-light text-center" onChange={this.handleChange} value={this.state.user.usertype} name='usertype' aria-label="Select Role">
                                            <option value="admin">Admin</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="student">Student</option>
                                        </select>
                                        <input name='id' id="id" value={'User ID: ' + this.state.user.id} hidden readOnly />
                                        <div className="form-floating">
                                            <input type="text" name='first_name' id="first_name" value={this.state.user.first_name} onChange={this.handleChange} className='bg-dark text-light form-control' autoFocus='1' placeholder="First Name" required />
                                            <label >First Name</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" name="last_name" id="last_name" value={this.state.user.last_name} onChange={this.handleChange} className='bg-dark text-light form-control' autoFocus='2' placeholder='Last Name' required />
                                            <label >Last Name</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="email" name='email' id="email" value={this.state.user.email} onChange={this.handleChange} className='bg-dark text-light form-control' autoFocus='3' placeholder="Email address" required />
                                            <label >Email Address</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" maxLength={13} minLength={13} onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) { event.preventDefault(); }
                                            }}
                                                name='cnic' id="cnic" value={this.state.user.cnic} onChange={this.handleChange} className='bg-dark text-light form-control' autoFocus='1' placeholder="CNIC" required />
                                            <label >CNIC</label>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.handleUpdateUser}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Users View */}
                    <div className='row text-center container-fluid'>
                        <div className='row col-md-8'>
                            <div className='col-md-3'>
                                <NavLink className="btn btn-light shadow-none" to="/dashboard/users/add">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg> Add User
                                </NavLink>
                            </div>
                            <div className='col-md-6 offset-md-3'>
                                <input type="text" name='filter' id="filter" value={this.state.filter || ''} onChange={(e) => this.setState({ filter: e.target.value })} className='col-12 text-center form-control' placeholder="Search Users by First Name" />
                            </div>
                        </div>
                        {/* <form className='row col-md-4' onSubmit={this.handleFilter}> */}
                        <div className='col-md-2 offset-md-2'>
                            <select onChange={async (e) => this.setState({ usertype: e.target.value })} onClick={this.handleFilter} className="form-select text-center" name='filter' aria-label="Select Role">
                                <option value='All'>All Users</option>
                                <option value="student">Students</option>
                                <option value="teacher">Teachers</option>
                                <option value="admin">Admins</option>
                            </select>
                        </div>
                        {/* <div className='col-md-4 align-self-right'>
                                <button className='btn btn-light shadow-none' type='submit'>
                                    Apply Filter
                                </button>
                            </div>
                        </form> */}
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">CNIC</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        return (<div className='text-center mt-5' > <h1>Loading...</h1> </div>)
    }
}

export default User
