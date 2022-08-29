import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const email = localStorage.getItem('email') || null
    const token = localStorage.getItem('token') || null
    const usertype = localStorage.getItem('usertype') || null
    const [auth, setAuth] = useState({ email: email, token: token, usertype: usertype });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;