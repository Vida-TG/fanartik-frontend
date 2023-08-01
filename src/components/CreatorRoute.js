import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function CreatorRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && (userInfo.isCreator || userInfo.isAdmin) ? children : <Navigate to="/signin" />;
}
