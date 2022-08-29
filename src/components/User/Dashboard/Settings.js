import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../UserAuth';

const Settings = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className='container-fluid d-flex justify-content-center'>
        <div className='rounded mt-3 text-center'>
          <h2 className=' mt-4 mb-3'>Profile</h2>
          <div className="p-2 text-dark bg-light rounded">
            <div className="col-12 mt-2 row line-height">
              <div className="col-4">
                <label labelfor="firstname">First Name</label>
              </div>
              <div className="col-8">
                <input type="text" disabled value={auth.firstname} className="form-control" id="firstname" />
              </div>
            </div>
            <div className="col-12 mt-2 row line-height">
              <div className="col-4">
                <label labelfor="lastname">Last Name</label>
              </div>
              <div className="col-8">
                <input type="text" disabled value={auth.lastname} className="form-control" id="lastname" />
              </div>
            </div>
            <div className="col-12 mt-2 row line-height">
              <div className="col-4">
                <label labelfor="cnic">CNIC</label>
              </div>
              <div className="col-8">
                <input type="text" disabled value={auth.cnic} className="form-control" id="cnic" />
              </div>
            </div>
            <div className="col-12 row line-height">
              <div className="col-4">
                <label labelfor="email">Email</label>
              </div>
              <div className="col-8">
                <input type="email" value={auth.email} disabled className="form-control" id="email" />
              </div>
            </div>
            <Link to='/dashboard/settings/changepassword' className='btn btn-dark mt-3 offset-1 col-6'> Change Password</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Settings
