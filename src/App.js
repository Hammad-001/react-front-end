//css
import './App.css';

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './components/others/RequireAuth';

// No auth Pages 
import { PrivateNavbar } from './components/noauthrequired/Navbar';
import ForgotPassword from './components/noauthrequired/ForgotPassword';
import Home from './components/noauthrequired/Homepage';
import Login from './components/noauthrequired/Login';
import Layout from './components/noauthrequired/Layout';
import PageNotFound from './components/noauthrequired/PageNotFound';
import ResetPassword from './components/noauthrequired/ResetPassword';

// Auth Pages
import AssignInstructor from './components/authrequired/AssignInstructor';
import Courses from './components/authrequired/Courses';
import CreateCourse from './components/authrequired/CreateCourse';
import CreateUser from './components/authrequired/CreateUser';
import MarkAttendance from './components/authrequired/MarkAttendance';
import MarkMarks from './components/authrequired/MarkMarks';
import Profile from './components/authrequired/Settings';
import User from './components/authrequired/User';
import ChangePassword from './components/authrequired/ChangePassword';

//  Context
import { useContext } from 'react';
import AuthContext from './components/others/UserAuth';

function App(props) {
    const { auth } = useContext(AuthContext);

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Layout />}>

                    <Route index element={
                        auth.token ?
                            <Navigate to="/u" replace />
                            : <Home />} />

                    <Route path="home" element={
                        <Navigate to="/" replace />} />

                    <Route path='login' element={
                        auth.token ?
                            <Navigate to="/u" replace />
                            : <Login />} />

                    <Route path='forgotpassword' element={
                        auth.token ?
                            <Navigate to="/u" replace /> :
                            <ForgotPassword />} />

                    <Route path='reset/:id/:token' element={
                        auth.token ?
                            <Navigate to="/u" replace />
                            : <ResetPassword />} />

                </Route>

                <Route element={<RequireAuth />}>

                    <Route path="/u" element={<PrivateNavbar />}>

                        <Route index element={<Profile token={auth.token} />} />

                        <Route path='/u/changepassword' element={<ChangePassword />} />

                        <Route path="/u/users" element={
                            auth.usertype === 'admin' ?
                                <User token={auth.token} />
                                : <Navigate to={'/404'} />} />

                        <Route path="/u/users/add" element={
                            auth.usertype === 'admin' ?
                                <CreateUser token={auth.token} />
                                : <Navigate to={'/404'} />} />

                        <Route path="/u/courses" element={
                            <Courses token={auth.token} usertype={auth.usertype} />} />

                        <Route path="/u/courses/add" element={
                            auth.usertype === 'admin' ?
                                <CreateCourse token={auth.token} />
                                : <Navigate to={'/404'} />} />

                        <Route path="/u/courses/:id" element={
                            auth.usertype === 'admin' ?
                                <AssignInstructor />
                                : <Navigate to={'/404'} />} />

                        <Route path="/u/courses/attendance/:id" element={
                            auth.usertype === 'teacher' ?
                                <MarkAttendance />
                                : <Navigate to={'/404'} />} />

                        <Route path="/u/courses/marks/:id" element={
                            auth.usertype === 'teacher' ?
                                <MarkMarks />
                                : <Navigate to={'/404'} />} />

                    </Route>

                </Route>

                <Route path="/404" element={<PageNotFound />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
