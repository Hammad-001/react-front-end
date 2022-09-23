import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../others/UserAuth';
import { handleChangePassword } from '../others/requests/authrequests/userrequests';

const ChangePassword = () => {
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState(<p className="text-light">Please Enter New Password!</p>);

  return (
    <>
      <div className='container-fluid d-flex justify-content-center'>
        <div className='rounded mt-3 text-center'>
          <h2 className=' mt-5 mb-4'>Change Password</h2>
          <div className=' mt-3'>{error}</div>
          <form id="resetpass-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={(e) => handleChangePassword(e, setError, auth.token)}>
            <input type="password" name='password1' id="password1" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="Password" />
            <input type="password" name="password2" id="password2" className='col-12 form-control mt-2 mb-2' autoFocus='2' placeholder='Verify Password' />
            <button className="btn btn-dark shadow-none col-12 mt-2 mb-2" autoFocus='3' type="submit">Change Password</button>
            <NavLink to="/u" autoFocus='4' className='text-decoration-none text-dark' > Back to Settings </NavLink>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword