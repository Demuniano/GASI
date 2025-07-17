import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
