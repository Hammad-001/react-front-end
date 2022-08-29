import React from 'react'
import { PrivateNavbar } from '../../pages/Navbar'
import { useContext } from 'react';
import AuthContext from '../UserAuth';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <PrivateNavbar auth={auth} />
      <h1>Dashboard</h1>

    </>
  )
}

export default Dashboard