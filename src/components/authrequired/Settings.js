import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { handleLoadProfile } from '../others/requests/authrequests/userrequests';

const Profile = (props) => {
  const token = props.token;
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    handleLoadProfile(token, setProfile);
  }, [token])

  if (profile) {
    return (
      <>
        <div className='container-fluid d-flex justify-content-center'>
          <div className='rounded mt-3 text-center'>
            <h2 className=' mt-4 mb-3'>Profile</h2>
            <div className="p-4 text-dark bg-light rounded">
              <div className="col-12 mt-2 row line-height">
                <div className="col-4">
                  <label labelfor="firstname">First Name</label>
                </div>
                <div className="col-8">
                  <input type="text" disabled value={profile.first_name} className="form-control" id="firstname" />
                </div>
              </div>
              <div className="col-12 mt-2 row line-height">
                <div className="col-4">
                  <label labelfor="lastname">Last Name</label>
                </div>
                <div className="col-8">
                  <input type="text" disabled value={profile.last_name} className="form-control" id="lastname" />
                </div>
              </div>
              <div className="col-12 mt-2 row line-height">
                <div className="col-4">
                  <label labelfor="cnic">CNIC</label>
                </div>
                <div className="col-8">
                  <input type="text" disabled value={profile.cnic} className="form-control" id="cnic" />
                </div>
              </div>
              <div className="col-12 mt-2 row line-height">
                <div className="col-4">
                  <label labelfor="email">Email</label>
                </div>
                <div className="col-8">
                  <input type="email" value={profile.email} disabled className="form-control" id="email" />
                </div>
              </div>
              <Link to='/u/changepassword' className='btn btn-dark mt-3 mb-1 shadow-none offset-1 col-6'> Change Password</Link>
            </div>
          </div>
        </div>
        <Outlet />
      </>
    )
  } return (<div className='text-center mt-5'><h1>Loading...</h1> </div>)
}

export default Profile
