import favicon from '../../assets/images/favicon.ico'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../others/UserAuth';
import { handleLogout } from '../others/requests/authrequests/userrequests';

const PublicNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <NavLink className="navbar-brand" to="/">
                        <img src={favicon} className="rounded-circle" alt="App Logo" width='40px' />
                        My LMS App
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

    // Perform Logout Functionality
    const handle = (e) => {
        const submit = handleLogout(auth.token);
        if (submit) {
            setAuth({})
            navigate("/login", { replace: true })
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-light nav-link" to="/">
                        <img src={favicon} className="rounded-circle" alt="App Logo" width='50px' />Hi, {auth.first_name}!
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item text-decoration-none">
                                <NavLink className="nav-link" to="/u/courses">Courses</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/u/users" hidden={auth.usertype === 'teacher' || auth.usertype === 'student'}>Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-dark w-100 shadow-none nav-link" onClick={handle}>Logout</button>
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
