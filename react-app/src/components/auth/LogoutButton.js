import React from 'react';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(reset());
    await dispatch(logout());
  };

  return <button className="navButton" onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
