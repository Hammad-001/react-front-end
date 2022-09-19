import { createContext, useState } from "react";
import Cookies from 'js-cookie'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const email = Cookies.get('email') || null
    const first_name = Cookies.get('first_name') || null
    const usertype = Cookies.get('usertype') || null
    const token = Cookies.get('token') || null

    const [auth, setAuth] = useState({ email: email, token: token, usertype: usertype, first_name: first_name });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;