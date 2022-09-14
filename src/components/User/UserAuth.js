import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const email = localStorage.getItem('email') || null
    const first_name = localStorage.getItem('first_name') || null
    const usertype = localStorage.getItem('usertype') || null
    const token = localStorage.getItem('token') || null

    const [auth, setAuth] = useState({ email: email, token: token, usertype: usertype, first_name: first_name });
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;