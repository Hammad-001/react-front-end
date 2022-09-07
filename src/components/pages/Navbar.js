import favicon from '../../assets/images/favicon.ico'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../User/UserAuth';

const PublicNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <NavLink className="navbar-brand" to="/">
                        <img src={favicon} className="rounded-circle" alt="App Logo" width='40px' />
                        React App
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

const PrivateNavbar = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const headers = { 'Authorization': 'Bearer ' + auth.token }

    const handleLogout = async () => {
        axios.get('http://localhost:8000/api/users/logout/', { headers })
            .then(response => {
                localStorage.removeItem('email')
                localStorage.removeItem('firstname')
                localStorage.removeItem('lastname')
                localStorage.removeItem('cnic')
                localStorage.removeItem('token')
                localStorage.removeItem('usertype')
                setAuth({})
                navigate("/login", { replace: true })

            }).catch(err => {
                alert("Some Internal Server Error Occured! \n Cannot logout!!")
            })
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-light nav-link" to="/">
                        <img src={favicon} className="rounded-circle" alt="App Logo" width='50px' />Hi, {auth.usertype}!
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item text-decoration-none">
                                <NavLink className="nav-link" to="/dashboard/courses">Courses</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard/users" hidden={auth.usertype === 'teacher' || auth.usertype === 'student'}>Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-dark w-100 shadow-none nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export { PrivateNavbar };

export default PublicNavbar;
