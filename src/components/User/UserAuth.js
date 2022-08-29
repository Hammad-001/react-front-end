import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const email = localStorage.getItem('email') || null
    const firstname = localStorage.getItem('firstname') || null
    const lastname = localStorage.getItem('lastname') || null
    const name = localStorage.getItem('name') || null
    const cnic = localStorage.getItem('cnic') || null
    const usertype = localStorage.getItem('usertype') || null
    const token = localStorage.getItem('token') || null

    const [auth, setAuth] = useState({ email: email, firstname: firstname, lastname: lastname, cnic: cnic, token: token, usertype: usertype, name: name });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;