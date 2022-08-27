import favicon from '../../assets/images/favicon.ico'
import { NavLink } from 'react-router-dom';

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
    const handleLogout = () => {
        ;
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
                                <ul className="dropdown-menu bg-dark">
                                    <li><NavLink className="nav-link" to="/dashboard/courses">Courses</NavLink></li>
                                    <li><NavLink className="nav-link" to="/dashboard/teacehrs">Teachers</NavLink></li>
                                    <li><NavLink className="nav-link" to="/dashboard/students">Teachers</NavLink></li>
                                    <li><NavLink className="nav-link" to="/dashboard/settings">Settings</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
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
