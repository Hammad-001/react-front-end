//css
import './App.css';

// router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './components/User/RequireAuth';

// pages
import Layout from './components/pages/Layout';
import Home from './components/pages/Homepage';
import About from './components/pages/About';
import Login from './components/pages/Login';
import AddUser from './components/User/Dashboard/AddUser';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import ChangePassword from './components/pages/ChangePassword';
import Profile from './components/User/Dashboard/Settings';
import Dashboard from './components/User/Dashboard/Dashboard';
// import Unauthorized from './components/User/Unauthorized';
import PageNotFound from './components/pages/PageNotFound';

import AuthContext from './components/User/UserAuth';
import { useContext } from 'react';
import { PrivateNavbar } from './components/pages/Navbar';
import User from './components/User/Dashboard/User';
import Courses from './components/User/Dashboard/Courses';
import AddCourse from './components/User/Dashboard/AddCourse';
import AssignInstructor from './components/User/Dashboard/AssignInstructor';
import MarkAttendance from './components/User/Dashboard/MarkAttendance';
import MarkMarks from './components/User/Dashboard/MarkMarks';

function App(props) {
    const { auth } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={auth.token ? <Navigate to="/dashboard" replace /> : <Home />} />
                    <Route path="home" element={<Navigate to="/" replace />} />
                    <Route path='about' element={auth.token ? <Navigate to="/dashboard" replace /> : <About />} />
                    <Route path='login' element={auth.token ? <Navigate to="/dashboard" replace /> : <Login />} />
                    <Route path='forgotpassword' element={auth.token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />
                    <Route path='reset/:id/:token' element={auth.token ? <Navigate to="/dashboard" replace /> : <ResetPassword />} />
                </Route>
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<PrivateNavbar />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/profile" element={<Profile token={auth.token} />} />
                        <Route path='/dashboard/profile/changepassword' element={<ChangePassword />} />
                        <Route path="/dashboard/users" element={auth.usertype === 'admin' ? <User token={auth.token} /> : <Navigate to={'/404'} />} />
                        <Route path="/dashboard/users/add" element={auth.usertype === 'admin' ? <AddUser token={auth.token} /> : <Navigate to={'/404'} />} />
                        <Route path="/dashboard/courses" element={<Courses token={auth.token} usertype={auth.usertype} />} />
                        <Route path="/dashboard/courses/add" element={auth.usertype === 'admin' ? <AddCourse token={auth.token} /> : <Navigate to={'/404'} />} />
                        <Route path="/dashboard/courses/:id" element={auth.usertype === 'admin' ? <AssignInstructor /> : <Navigate to={'/404'} />} />
                        <Route path="/dashboard/courses/attendance/:id" element={auth.usertype === 'teacher' ? <MarkAttendance /> : <Navigate to={'/404'} />} />
                        <Route path="/dashboard/courses/marks/:id" element={auth.usertype === 'teacher' ? <MarkMarks /> : <Navigate to={'/404'} />} />
                    </Route>
                </Route>
                <Route path="/404" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
