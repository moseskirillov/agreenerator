import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { LOGIN_PAGE } from '../constants'

const ProtectedRoute = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to={LOGIN_PAGE} replace/>
  }
  return <Outlet/>
};

export default ProtectedRoute;