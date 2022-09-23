import axios from 'axios';
import Cookies from 'js-cookie';

// View All Users
const handleLoadUser = (usertype, token, setUsers, setIsLoading) => {
    axios.get('http://localhost:8000/api/users/users/', {
        params: {
            usertype: usertype,
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        setUsers(response.data.users)
        setIsLoading(false);
    }).catch(error => error.response)
}

// Create User
const handleCreateUser = (e, token, setEmail, setData, setError) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
        first_name: form.get('first_name'),
        last_name: form.get('last_name'),
        email: form.get('email'),
        password: form.get('password'),
        cnic: form.get('cnic'),
        usertype: form.get('usertype'),
    }
    setEmail(data.email)
    axios.post('http://localhost:8000/api/users/users/', data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        document.getElementById('user-form').reset();
        setError(<p className="text-success">{response?.data?.msg}!</p>);
    }).catch(err => {
        if (err?.response?.data?.errors?.email) {
            setData(data);
            document.getElementById('click').click()
        }
    })
}

// Handle Create User That Already Exists
const handleCreateUserExits = (val, token, setError, email, data) => {
    axios.put('http://localhost:8000/api/users/users/', { email: email, data: data, change: val }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        document.getElementById('user-form').reset();
        setError(<p className="text-success">{response?.data?.msg}!</p>)
    }).catch(err => {
        setError(<p className="text-danger">Unknow Error Occured!</p>)
    })
}

//  Update User Record
const handleUpdateUser = (e, usertype, token, user, setUsers, setIsLoading) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/users/users/', user, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        document.getElementById('update-form').reset();
        handleLoadUser(usertype, token, setUsers, setIsLoading)
        setIsLoading(true);
    }).catch(error => error.response)
}

// Delete User Record
const handleDeleteUser = (e, usertype, id, token, setUsers, setIsLoading) => {
    e.preventDefault();
    axios.delete('http://localhost:8000/api/users/users/', {
        data: {
            id: id
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        handleLoadUser(usertype, token, setUsers, setIsLoading)
        setIsLoading(true);
    }).catch(error => error.response)
}

// View Profile
const handleLoadProfile = (token, setProfile) => {
    axios.get('http://localhost:8000/api/users/profile/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        setProfile(response.data)
    }).catch(error => error.response)
}

// For Password Change
const handleChangePassword = (e, setError, token) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password1 = form.get('password1')
    const password2 = form.get('password2')

    if (password1 === "" && password2 === "") {
        setError(<p className="text-danger">All Fields are Required!</p>)
    } else if (password1 === "" || password2 === "") {
        setError(<p className="text-warning">Please Enter Your password!</p>)
    } else if (password1 !== password2) {
        setError(<p className="text-warning">You Password Does not Match!</p>)
    }
    else {
        axios.post('http://localhost:8000/api/users/changepassword/', { password: password1 }, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(response => {
                setError(<p className="text-success">Password Changed Successfully!</p>)
                document.getElementById('resetpass-form').reset();
            })
            .catch(err => {
                setError(<p className="text-danger">Please Try Again Later!</p>)
            });
    }
}

// For Logout
const handleLogout = (token) => {
    axios.get('http://localhost:8000/api/users/logout/', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(response => {
            Cookies.remove('email')
            Cookies.remove('usertype')
            Cookies.remove('first_name')
            Cookies.remove('token')
            return true;

        }).catch(err => {
            alert("Some Internal Server Error Occured! \n Cannot logout!!")
            return false;
        })
}

export default handleLoadUser
export {
    handleCreateUser, handleCreateUserExits, handleUpdateUser, handleDeleteUser,
    handleLoadProfile, handleChangePassword, handleLogout
}