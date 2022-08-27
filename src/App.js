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
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import ChangePassword from './components/pages/ChangePassword';
import Settings from './components/User/Dashboard/Settings';
import Dashboard from './components/User/Dashboard/Dashboard';
import Unauthorized from './components/User/Unauthorized';
import PageNotFound from './components/pages/PageNotFound';

import useAuth from './components/User/useAuth';

const AllRoles = {
    'Admin': 'admin',
    'Teacher': 'Teacher',
    'Student': 'student'
}

function App(props) {
    const { auth } = useAuth();

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
                <Route element={<RequireAuth allowedRoles={[AllRoles.Admin, AllRoles.Teacher, AllRoles.Student]} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/profile" element={<Dashboard />} />
                    <Route path='/dashboard/settings' element={<Settings />} />
                    <Route path='/dashboard/settings/changepassword' element={<ChangePassword />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[AllRoles.Admin]} />}>
                    <Route path="/dashboard/courses" element={<Dashboard />} />
                    <Route path="/dashboard/students" element={<Dashboard />} />
                    <Route path="/dashboard/teachers" element={<Dashboard />} />
                </Route>
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
