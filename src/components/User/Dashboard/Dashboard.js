import React from 'react'
import { PrivateNavbar } from '../../pages/Navbar'
import useAuth from '../useAuth';

const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <>
      <PrivateNavbar auth={auth} />
      <h1>I am Dashboard!</h1>
    </>
  )
}

export default Dashboard