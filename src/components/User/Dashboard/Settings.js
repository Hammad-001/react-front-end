import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Settings = () => {
  return (
    <div>
    I am settings.
     <Link to='/dashboard/settings/changepassword'> Change Password</Link>
     <Outlet/>
    </div>
  )
}

export default Settings
