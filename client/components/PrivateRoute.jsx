import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth, AuthContext } from './AuthContext.jsx';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return isAuthenticated.status ? (<Outlet />) : (<Navigate to="/" />);
};

export default PrivateRoute;
