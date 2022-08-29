import favicon from '../../assets/images/favicon.ico'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../User/UserAuth';
import setAxiosAuthToken from '../api/axios';


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
                            <li className="nav-item active">
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

    const handleLogout = async () => {
        setAxiosAuthToken(auth.token);

        axios.post('http://localhost:8000/api/users/logout/')
            .then(response => {
                localStorage.removeItem('email')
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

                    <NavLink className="navbar-brand" to="/">
                        <img src={favicon} className="rounded-circle" alt="App Logo" width='40px' />
                        React App
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to='/dashboard'>DashBoard</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/dashboard/profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">Available Actions</NavLink>
                                <ul className="dropdown-menu bg-dark text-center">
                                    <li><NavLink className="nav-link" to="/dashboard/courses">Courses</NavLink></li>
                                    <li><NavLink className="nav-link" to="/dashboard/teachers">Teachers</NavLink></li>
                                    <li><NavLink className="nav-link" to="/dashboard/students">Students</NavLink></li>
                                    <li><NavLink className="nav-link" to="/dashboard/settings">Settings</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="btn btn-dark w-100 nav-link" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export { PrivateNavbar };

export default PublicNavbar;
