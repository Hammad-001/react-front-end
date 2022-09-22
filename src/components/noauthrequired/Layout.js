import PublicNavbar from "./Navbar";
import { Outlet } from 'react-router-dom';

const Layout = (props) => {
    return (
        <>
            <PublicNavbar />
            <Outlet />
        </>
    )
}

export default Layout